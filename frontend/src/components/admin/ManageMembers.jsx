import React, { useState, useEffect, useMemo } from 'react';
import styles from './ManageMembers.module.scss';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import useGetAllMembers from '../../hooks/useGetAllMembers';
import MemberTable from './MemberTable';
import { api } from '../../utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import useAuthStore from '../../store/authStore';

const ManageMembers = () => {
  const { t } = useTranslation();
  const { data: members, isLoading, error } = useGetAllMembers();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const queryClient = useQueryClient();
  const [memberList, setMemberList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const priceRef = React.useRef();
  const [dialogError, setDialogError] = useState(null);
  const { userRole } = useAuthStore();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        if (members) {
            setMemberList(members);
        }
    }, [members]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const blockMutation = useMutation({
        mutationFn: (id) => api.put(`/admin/members/${id}/block`),
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
            setSnackbarMessage(t('會員封鎖成功'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        },
        onError: (error) => {
            console.error('Error blocking member:', error);
            setSnackbarMessage(t('封鎖會員時出錯'));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    });

    const unblockMutation = useMutation({
        mutationFn: (id) => api.put(`/admin/members/${id}/unblock`),
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
            setSnackbarMessage(t('會員解除封鎖成功'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        },
        onError: (error) => {
            console.error('Error unblocking member:', error);
            setSnackbarMessage(t('解除封鎖會員時出錯'));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    });

    const handleBlockMember = (id) => {
        blockMutation.mutate(id);
    };

    const handleUnblockMember = (id) => {
        unblockMutation.mutate(id);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        // Clear the input values when closing the dialog
        if (usernameRef.current) {
            usernameRef.current.value = '';
        }
        if (passwordRef.current) {
            passwordRef.current.value = '';
        }
        if (priceRef.current) {
            priceRef.current.value = '';
        }
        setDialogError(null);
    };

    const addMutation = useMutation({
        mutationFn: (newMember) => api.post('/admin/register-member', newMember),
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
            handleCloseDialog();
            setSnackbarMessage(t('會員新增成功'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        },
        onError: (error) => {
            if (error.response && error.response.status === 400) {
                setDialogError(t('用戶名已存在'));
            } else {
                setDialogError(error.message);
            }
        }
    });

    const handleAddMember = async () => {
        const newMember = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            price: priceRef.current.value,
            createdBy: userRole === 'main' ? 'main' : 'sub',
        };
        addMutation.mutate(newMember);
    };

    const columns = useMemo(
        () => [
            {
                header: t('用戶名'),
                accessorKey: 'username',
            },
            {
                header: t('價格'),
                accessorKey: 'price',
            },
            {
                header: t('操作'),
                cell: (props) => (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title={props.row.original.blocked ? t('解除封鎖') : t('封鎖')}>
                            <IconButton
                                aria-label={props.row.original.blocked ? t('解除封鎖') : t('封鎖')}
                                onClick={() =>
                                    props.row.original.blocked
                                        ? handleUnblockMember(props.row.original._id)
                                        : handleBlockMember(props.row.original._id)
                                }
                            >
                                {props.row.original.blocked ? (
                                    <CheckCircleIcon sx={{ fontSize: '1rem', color: 'green' }} />
                                ) : (
                                    <BlockIcon sx={{ fontSize: '1rem', color: 'red' }} />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
                size: 100,
            },
        ],
        [t, handleBlockMember, handleUnblockMember]
    );

    const table = useReactTable({
        data: memberList,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

  return (
    <div className={styles.manageMembersContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1" className={styles.manageMembersTitle} style={{ color: 'white' }}>{t("管理會員")}</Typography>
          <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
          >
              {t('新增')}
          </Button>
      </Box>
      <div className={styles.manageMembersContent}>
        {isLoading ? (
          <Typography>{t('Loading...')}</Typography>
        ) : error ? (
          <Typography color="error">{error.message}</Typography>
        ) : (
            <ThemeProvider theme={darkTheme}>
                <TableContainer >
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
            </ThemeProvider>
        )}
      </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{t('新增會員')}</DialogTitle>
            <DialogContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    autoFocus
                    sx={{ mt: 2 }}
                    label={t('用戶名')}
                    type="text"
                    fullWidth
                    name="username"
                    inputRef={usernameRef}
                    autoComplete="off"
                />
                <TextField
                    inputRef={passwordRef}
                    label={t('密碼')}
                    type="password"
                    fullWidth
                    name="password"
                    autoComplete="new-password"
                />
                <TextField
                    inputRef={priceRef}
                    label={t('價格')}
                    type="number"
                    fullWidth
                    name="price"
                    autoComplete="off"
                />
                {dialogError && <p className="error-message">{dialogError}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>{t('取消')}</Button>
                <Button onClick={handleAddMember} color="primary" disabled={addMutation.isLoading}>
                    {addMutation.isLoading ? 'Loading...' : t('新增')}
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </div>
  );
};

export default ManageMembers;
