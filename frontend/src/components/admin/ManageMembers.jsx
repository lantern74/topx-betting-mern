import React from 'react';
import styles from './ManageMembers.module.scss';
import { useTranslation } from 'react-i18next';

const ManageMembers = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.manageMembersContainer}>
      <h1 className={styles.manageMembersTitle}>{t("管理會員")}</h1>
      <div className={styles.manageMembersContent}>
        <p>{t("在這裡您可以管理會員。")}</p>
        {/* Add member management content here */}
      </div>
    </div>
  );
};

export default ManageMembers;
