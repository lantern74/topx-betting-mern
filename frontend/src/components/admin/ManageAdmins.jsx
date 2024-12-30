import React from 'react';
import styles from './ManageAdmins.module.scss';
import { useTranslation } from 'react-i18next';

const ManageAdmins = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.manageAdminsContainer}>
      <h1 className={styles.manageAdminsTitle}>{t("管理管理員")}</h1>
      <div className={styles.manageAdminsContent}>
        <p>{t("在這裡您可以管理管理員。")}</p>
        {/* Add admin management content here */}
      </div>
    </div>
  );
};

export default ManageAdmins;
