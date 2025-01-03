import React, { useState, useEffect } from 'react';
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
  createTheme,
  ThemeProvider,
    Paper,
    Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import useGetAllMembers from '../../hooks/useGetAllMembers';
import MemberTable from './MemberTable';
import { api } from '../../utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    const dateRef = React.useRef();
  const [dialogError, setDialogError] = useState(null);
    const [editPriceOpen, setEditPriceOpen] = useState(false);
    const [editCredentialOpen, setEditCredentialOpen] = useState(false);
    const [editMember, setEditMember] = useState({ id: null, username: '', password: '', price: '' });
    const editUsernameRef = React.useRef();
    const editPasswordRef = React.useRef();
    const editPriceRef = React.useRef();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteMemberId, setDeleteMemberId] = useState(null);
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
        if (dateRef.current) {
            dateRef.current.value = '';
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
            date: dateRef.current.value,
            createdBy: userRole === 'main' ? 'main' : 'sub',
        };
        addMutation.mutate(newMember);
    };

    const handleEditPriceOpen = (member) => {
        setEditMember({ id: member._id, username: member.username, password: '', price: member.price });
        setEditPriceOpen(true);
        // Set the initial values of the refs when the dialog opens
        setTimeout(() => {
            if (editPriceRef.current) {
                editPriceRef.current.value = member.price;
            }
        }, 0);
    };

    const handleEditPriceClose = () => {
        setEditPriceOpen(false);
        setEditMember({ id: null, username: '', password: '', price: '' });
    };

    const handleEditCredentialOpen = (member) => {
        setEditMember({ id: member._id, username: member.username, password: '', price: member.price });
        setEditCredentialOpen(true);
        // Set the initial values of the refs when the dialog opens
        setTimeout(() => {
            if (editUsernameRef.current) {
                editUsernameRef.current.value = member.username;
            }
            if (editPasswordRef.current) {
                editPasswordRef.current.value = ''; // Or member.password if you want to show the existing password
            }
        }, 0);
    };

    const handleEditCredentialClose = () => {
        setEditCredentialOpen(false);
        setEditMember({ id: null, username: '', password: '', price: '' });
    };

    const handleEditMemberPrice = async () => {
        try {
            await api.put(`/admin/members/${editMember.id}`, {
                price: editPriceRef.current.value,
            });
            queryClient.invalidateQueries(['members']);
            handleEditPriceClose();
            setSnackbarMessage(t('會員編輯成功'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error updating member:', err);
        }
    };

    const handleEditMemberCredential = async () => {
        try {
            await api.put(`/admin/members/${editMember.id}`, {
                username: editUsernameRef.current.value,
                password: editPasswordRef.current.value,
            });
            queryClient.invalidateQueries(['members']);
            handleEditCredentialClose();
            setSnackbarMessage(t('會員編輯成功'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error updating member:', err);
        }
    };

    const handleDeleteMemberOpen = (member) => {
        setDeleteMemberId(member._id);
        setDeleteOpen(true);
    };

    const handleDeleteMemberClose = () => {
        setDeleteOpen(false);
        setDeleteMemberId(null);
    };

    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/members/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
            handleDeleteMemberClose();
            setSnackbarMessage(t('會員刪除成功'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        },
        onError: (error) => {
            console.error('Error deleting member:', error);
            setSnackbarMessage(t('刪除會員時出錯'));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    });

    const handleDeleteMember = async () => {
        deleteMutation.mutate(deleteMemberId);
    };


  return (
    <div className={styles.manageMembersContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant="h4" component="h1" className={styles.manageMembersTitle} style={{ color: 'white' }}
          sx={{ mb: { xs: 2, sm: 0 } }}
        >{t("管理會員")}</Typography>
          <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
          >
              {t('新增')}
          </Button>
      </Box>
        {isLoading ? (
          <Typography>{t('Loading...')}</Typography>
        ) : error ? (
          <Typography color="error">{error.message}</Typography>
        ) : (
            <ThemeProvider theme={darkTheme}>
                <Paper style={{ 
                  backgroundColor: '#333', 
                  color: 'white',
                  padding: '16px'
                }}>
                    <div style={{ overflowX: 'auto' }}>
                    <MemberTable
                        members={memberList}
                        handleBlockMember={handleBlockMember}
                        handleUnblockMember={handleUnblockMember}
                        handleEditPriceOpen={handleEditPriceOpen}
                        handleEditCredentialOpen={handleEditCredentialOpen}
                        handleDeleteMemberOpen={handleDeleteMemberOpen}
                    />
                    </div>
                </Paper>
            </ThemeProvider>
        )}
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
                <TextField
                    inputRef={dateRef}
                    label={t('Date')}
                    type="date"
                    fullWidth
                    name="date"
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
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
        <Dialog open={editPriceOpen} onClose={handleEditPriceClose} sx={{ marginTop: '20px' }}>
            <DialogTitle>{t('編輯會員')}</DialogTitle>
            <DialogContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    inputRef={editPriceRef}
                    label={t('價格')}
                    type="number"
                    fullWidth
                    name="price"
                    autoComplete="off"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditPriceClose}>{t('取消')}</Button>
                <Button onClick={handleEditMemberPrice} color="primary">
                    {t('儲存')}
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={editCredentialOpen} onClose={handleEditCredentialClose} sx={{ marginTop: '20px' }}>
            <DialogTitle>{t('編輯會員')}</DialogTitle>
            <DialogContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    inputRef={editUsernameRef}
                    autoFocus
                    sx={{ mt: 2 }}
                    label={t('用戶名')}
                    type="text"
                    fullWidth
                    name="username"
                />
                <TextField
                    inputRef={editPasswordRef}
                    label={t('密碼')}
                    type="password"
                    fullWidth
                    name="password"
                    autoComplete="new-password"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditCredentialClose}>{t('取消')}</Button>
                <Button onClick={handleEditMemberCredential} color="primary">
                    {t('儲存')}
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={deleteOpen} onClose={handleDeleteMemberClose}>
            <DialogTitle>{t('刪除會員')}</DialogTitle>
            <DialogContent>
                <Typography>{t('確定要刪除此會員嗎？')}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteMemberClose}>{t('取消')}</Button>
                <Button onClick={handleDeleteMember} color="error" disabled={deleteMutation.isLoading}>
                    {deleteMutation.isLoading ? 'Deleting...' : <>{t('刪除')}</>}
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
