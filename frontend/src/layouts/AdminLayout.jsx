import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import i18n from '../i18n';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const navigate = useNavigate();
    const location = useLocation();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const languageMenuOpen = Boolean(languageAnchorEl);

    useEffect(() => {
        if (isAuthenticated) {
            if (userRole === 'sub' && location.pathname.startsWith('/admin')) {
                navigate('/subadmin');
            } else if (userRole === 'main' && location.pathname.startsWith('/subadmin')) {
                navigate('/admin');
            }
        }
    }, [isAuthenticated, userRole, location, navigate]);


  const handleLogout = () => {
    logout();
    if (userRole === 'main') {
      navigate('/admin/login');
    } else if (userRole === 'sub') {
      navigate('/subadmin/login');
    } else {
        navigate('/login');
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguageAnchorEl(null);
    };

    const handleLanguageMenuOpen = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageAnchorEl(null);
    };

  if (!isAuthenticated || userRole === 'member') {
    return navigate('/login');
  }

    const handleDrawerLinkClick = () => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    };

  const drawer = (
    <div className={styles.sidebarContent}>
      <Typography variant="h6" className={styles.adminTitle} sx={{textAlign: 'center', my: 2}}>
        <Link to="/">
          <img src="/images/logo/topx-logo.png" alt="Logo" style={{ width: '150px', display: 'block', margin: '0 auto 10px' }} />
        </Link>
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={userRole === 'sub' ? '/subadmin' : '/admin'} onClick={handleDrawerLinkClick}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t("儀表板")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={userRole === 'sub' ? '/subadmin/manage-members' : '/admin/manage-members'} onClick={handleDrawerLinkClick}>
            <ListItemIcon>
              <PeopleIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t("管理會員")} />
          </ListItemButton>
        </ListItem>
        {userRole === 'main' && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to={userRole === 'sub' ? '/subadmin/manage-admins' : '/admin/manage-admins'} onClick={handleDrawerLinkClick}>
              <ListItemIcon>
                <AdminPanelSettingsIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={t("管理副管理員")} />
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar component="nav" sx={{ 
        backgroundColor: '#333',
        position: 'fixed',
        width: { sm: `calc(100% - 300px)` },
        ml: { sm: '300px' }
      }}>
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
            <Link to="/">
              <img src="/images/logo/topx-logo.png" alt="Logo" style={{ height: '40px' }} />
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isAuthenticated
              ? (
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                  {t("登入")}
                </Link>
              )
              : (
                <button
                  onClick={() => {
                    let redirectPath = "/login";
                    if (userRole === "main") {
                      redirectPath = "/admin/login";
                    } else if (userRole === "sub") {
                      redirectPath = "/subadmin/login";
                    }
                    logout();
                    navigate(redirectPath);
                  }}
                  style={{ 
                    color: 'white', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {t("登出")}
                </button>
              )}
            {(userRole === "main" || userRole === "sub") && (
              <Link
                to={userRole === "main" ? "/admin" : "/subadmin"}
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {t("管理")}
              </Link>
            )}
            <IconButton
                color="inherit"
                onClick={handleLanguageMenuOpen}
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                anchorEl={languageAnchorEl}
                open={languageMenuOpen}
                onClose={handleLanguageMenuClose}
            >
                <MenuItem onClick={() => changeLanguage('en')}>
                    <img src="/images/icon/us.svg" alt="English" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                    English
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('zh')}>
                    <img src="/images/icon/china.svg" alt="Chinese" style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                    中文
                </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { sm: 300 },
          flexShrink: 0,
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
          overflowY: 'auto'
        }}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', backgroundColor: '#333', color: 'white' },
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
        sx={{ 
          flexGrow: 1,
          width: { sm: `calc(100% - 300px)` },
          ml: { sm: '300px' },
          mt: '64px', // Height of AppBar
          overflowX: 'auto',
          minHeight: 'calc(100vh - 64px)',
          padding: { xs: 0, sm: 3 }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
