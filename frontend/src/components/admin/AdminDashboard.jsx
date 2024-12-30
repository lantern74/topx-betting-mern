import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.scss';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import useGetAllMembers from '../../hooks/useGetAllMembers';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { userRole } = useAuthStore();
  const { data: members, isLoading, error } = useGetAllMembers();
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (members) {
      setMemberCount(members.length);
    }
  }, [members]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>{t("管理員儀表板")}</h1>
      <div className={styles.dashboardContent}>
        <p>{t("歡迎來到管理員儀表板。")}</p>
        <div className={styles.dashboardSummary}>
          <p>
            {t("管理會員")}: <span className={styles.summaryValue}>{isLoading ? 'Loading...' : memberCount}</span>
          </p>
          {userRole === 'main' && (
            <p>
              {t("管理管理員")}: <span className={styles.summaryValue}>0</span> {/* Placeholder for sub-admin count */}
            </p>
          )}
        </div>
        <div className={styles.dashboardLinks}>
          <a href="/admin/manage-members" className={styles.dashboardLink}>{t("管理會員")}</a>
          {userRole === 'main' && (
            <a href="/admin/manage-admins" className={styles.dashboardLink}>{t("管理管理員")}</a>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
