import React, { useState, useEffect } from 'react';
import styles from './ManageMembers.module.scss';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import useGetAllMembers from '../../hooks/useGetAllMembers';
import MemberTable from './MemberTable';
import { api } from '../../utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ManageMembers = () => {
  const { t } = useTranslation();
  const { data: members, isLoading, error } = useGetAllMembers();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const queryClient = useQueryClient();
  const [memberList, setMemberList] = useState([]);

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

  return (
    <div className={styles.manageMembersContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1" className={styles.manageMembersTitle} style={{ color: 'white' }}>{t("管理會員")}</Typography>
      </Box>
      <div className={styles.manageMembersContent}>
        {isLoading ? (
          <Typography>{t('Loading...')}</Typography>
        ) : error ? (
          <Typography color="error">{error.message}</Typography>
        ) : (
          <MemberTable members={memberList} handleBlockMember={handleBlockMember} handleUnblockMember={handleUnblockMember} />
        )}
      </div>
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
