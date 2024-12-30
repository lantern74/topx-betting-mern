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
                <MemberTable
                    members={memberList}
                    handleBlockMember={handleBlockMember}
                    handleUnblockMember={handleUnblockMember}
                />
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
