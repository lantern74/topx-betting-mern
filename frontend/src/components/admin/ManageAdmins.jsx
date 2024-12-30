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
  Tooltip,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
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
import useGetAllSubAdmins from '../../hooks/useGetAllSubAdmins';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ManageAdmins = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const { mutate, isLoading, error } = useRegisterSubAdmin();
  const [dialogError, setDialogError] = useState(null);
  const { data: subAdmins, isLoading: isSubAdminsLoading, error: subAdminsError } = useGetAllSubAdmins();
  const [editOpen, setEditOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState({ id: null, username: '' });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const queryClient = useQueryClient();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

  useEffect(() => {
    if (subAdmins) {
      setAdmins(subAdmins);
    }
  }, [subAdmins]);

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

  const addMutation = useMutation({
    mutationFn: (newAdmin) => api.post('/admin/register-subadmin', newAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries(['subadmins']);
      handleCloseDialog();
    },
    onError: (error) => {
      setDialogError(error.message);
    }
  });

  const handleAddAdmin = async () => {
    addMutation.mutate(newAdmin);
  };

  const handleEditOpen = (admin) => {
    setEditAdmin({ id: admin._id, username: admin.username });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditAdmin({ id: null, username: '' });
  };

  const handleEditInputChange = (e) => {
    setEditAdmin({ ...editAdmin, username: e.target.value });
  };

  const handleEditAdmin = async () => {
    try {
      await api.put(`/admin/subadmins/${editAdmin.id}`, { username: editAdmin.username });
      queryClient.invalidateQueries(['subadmins']);
      handleEditClose();
    } catch (err) {
      console.error('Error updating admin:', err);
    }
  };

  const handleDeleteOpen = (id) => {
    setDeleteAdminId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteAdminId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/subadmins/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['subadmins']);
      handleDeleteClose();
    },
    onError: (error) => {
      console.error('Error deleting admin:', error);
    }
  });

  const handleDeleteAdmin = async () => {
    deleteMutation.mutate(deleteAdminId);
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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={t('編輯')}>
              <IconButton aria-label="edit" onClick={() => handleEditOpen(props.row.original)}>
                <EditIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('刪除')}>
              <IconButton aria-label="delete" onClick={() => handleDeleteOpen(props.row.original._id)}>
                <DeleteIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        size: 100,
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
        <Typography variant="h4" component="h1" className={styles.manageAdminsTitle} style={{ color: 'white' }}>{t('管理管理員')}</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          {t('新增管理員')}
        </Button>
      </Box>
      <Card style={{ backgroundColor: '#333', color: 'white' }}>
        <CardContent>
            <ThemeProvider theme={darkTheme}>
          <TableContainer component={Paper} >
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
                      <TableCell key={cell.id} >
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
            </ThemeProvider>
          <ThemeProvider theme={darkTheme}>
          <Dialog open={openDialog} onClose={handleCloseDialog} >
            <DialogTitle>{t('新增管理員')}</DialogTitle>
            <DialogContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TextField
                autoFocus
                
                label={t('用戶名')}
                type="text"
                fullWidth
                name="username"
                value={newAdmin.username}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <TextField
                
                label={t('密碼')}
                type="password"
                fullWidth
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                autoComplete="off"
              />
              {dialogError && <p className="error-message">{dialogError}</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>{t('取消')}</Button>
              <Button onClick={handleAddAdmin} color="primary" disabled={addMutation.isLoading}>
                {addMutation.isLoading ? 'Loading...' : t('新增')}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>{t('編輯管理員')}</DialogTitle>
            <DialogContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TextField
                autoFocus
                
                label={t('用戶名')}
                type="text"
                fullWidth
                name="username"
                value={editAdmin.username}
                onChange={handleEditInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>{t('取消')}</Button>
              <Button onClick={handleEditAdmin} color="primary">
                {t('儲存')}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={deleteOpen} onClose={handleDeleteClose}>
            <DialogTitle>{t('刪除管理員')}</DialogTitle>
            <DialogContent>
              <Typography>{t('確定要刪除此管理員嗎？')}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose}>{t('取消')}</Button>
              <Button onClick={handleDeleteAdmin} color="error" disabled={deleteMutation.isLoading}>
                {deleteMutation.isLoading ? 'Deleting...' : t('刪除')}
              </Button>
            </DialogActions>
          </Dialog>
            </ThemeProvider>
        </CardContent>
      </Card>
      {subAdminsError && <Typography variant="body2" color="error" mt={2}>{subAdminsError.message}</Typography>}
    </div>
  );
};

export default ManageAdmins;
