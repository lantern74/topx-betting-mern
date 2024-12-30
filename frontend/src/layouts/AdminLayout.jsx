import React from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import styles from './AdminLayout.module.scss';
import { useTranslation } from 'react-i18next';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  if (!isAuthenticated || userRole === 'member') {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.adminTitle}>Admin Panel</h2>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/admin/dashboard" className={styles.navLink}>{t("儀表板")}</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/admin/manage-members" className={styles.navLink}>{t("管理會員")}</Link>
            </li>
            {userRole === 'main' && (
              <li className={styles.navItem}>
                <Link to="/admin/manage-admins" className={styles.navLink}>{t("管理管理員")}</Link>
              </li>
            )}
          </ul>
          <button onClick={handleLogout} className={styles.logoutButton}>{t("登出")}</button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
