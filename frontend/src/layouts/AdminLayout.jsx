import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import styles from './AdminLayout.module.scss';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  AppBar,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated || userRole === 'member') {
    return <Navigate to="/login" />;
  }

  const drawer = (
    <div className={styles.sidebarContent}>
      <Typography variant="h6" className={styles.adminTitle} sx={{textAlign: 'center', my: 2}}>
        Admin Panel
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/dashboard">
            <ListItemIcon>
              <DashboardIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t("儀表板")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/manage-members">
            <ListItemIcon>
              <PeopleIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t("管理會員")} />
          </ListItemButton>
        </ListItem>
        {userRole === 'main' && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/manage-admins">
              <ListItemIcon>
                <AdminPanelSettingsIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={t("管理管理員")} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Box sx={{ mt: 'auto', mx: 2, mb: 2 }}>
        <ListItemButton onClick={handleLogout} sx={{ justifyContent: 'center' }}>
          <ListItemIcon sx={{ justifyContent: 'center' }}>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={t("登出")} sx={{ textAlign: 'center' }} />
        </ListItemButton>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', display: { xs: 'none', sm: 'block' } }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: 300 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, backgroundColor: '#333', color: 'white' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, backgroundColor: '#333', color: 'white' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 300px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
