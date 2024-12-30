import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import useRegisterSubAdmin from '../../hooks/useRegisterSubAdmin';
import styles from './ManageAdmins.module.scss';
import { api } from '../../utils/api';

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

  return (
    <div className={styles.manageAdminsContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1 className={styles.manageAdminsTitle}>{t('管理管理員')}</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          {t('新增管理員')}
        </Button>
      </Box>
      <div className={styles.manageAdminsContent}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('用戶名')}</TableCell>
                <TableCell>{t('角色')}</TableCell>
                <TableCell>{t('操作')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </div>
    </div>
  );
};

export default ManageAdmins;
