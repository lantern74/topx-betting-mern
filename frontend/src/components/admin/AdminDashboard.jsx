import React from 'react';
import styles from './AdminDashboard.module.scss';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>{t("管理員儀表板")}</h1>
      <div className={styles.dashboardContent}>
        <p>{t("歡迎來到管理員儀表板。")}</p>
        {/* Add dashboard content here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
