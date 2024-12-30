import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import useRegisterSubAdmin from '../../hooks/useRegisterSubAdmin';
import styles from './ManageAdmins.module.scss';
import { api } from '../../utils/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const ManageAdmins = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const { mutate, isLoading, error } = useRegisterSubAdmin();
  const [dialogError, setDialogError] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get('/admin/members');
      setAdmins(response.data);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAdmin({ username: '', password: '' });
    setDialogError(null);
  };

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async () => {
    try {
      await mutate(newAdmin);
      fetchAdmins();
      handleCloseDialog();
    } catch (err) {
      setDialogError(err.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: t('用戶名'),
        accessorKey: 'username',
      },
      {
        header: t('角色'),
        accessorKey: 'role',
      },
      {
        header: t('操作'),
        cell: (props) => (
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        ),
      },
    ],
    [t]
  );

  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={styles.manageAdminsContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1" className={styles.manageAdminsTitle} >{t('管理管理員')}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          {t('新增管理員')}
        </Button>
      </Box>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()} style={{cursor: 'pointer'}}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' ⬆️',
                          desc: ' ⬇️',
                        }[header.column.getIsSorted() ]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {t('上一頁')}
            </Button>
            <span>
              {t('第')} {table.getState().pagination.pageIndex + 1} {t('頁')} {t('共')} {table.getPageCount()} {t('頁')}
            </span>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {t('下一頁')}
            </Button>
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{t('新增管理員')}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label={t('用戶名')}
                type="text"
                fullWidth
                name="username"
                value={newAdmin.username}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label={t('密碼')}
                type="password"
                fullWidth
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
              />
              {dialogError && <p className="error-message">{dialogError}</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>{t('取消')}</Button>
              <Button onClick={handleAddAdmin} color="primary" disabled={isLoading}>
                {isLoading ? 'Loading...' : t('新增')}
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAdmins;
