import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.scss';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import useGetAllMembers from '../../hooks/useGetAllMembers';
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
} from '@mui/material';

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
      <Typography variant="h4" component="h1" className={styles.dashboardTitle} gutterBottom>
        {t("管理員儀表板")}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" paragraph>
            {t("歡迎來到管理員儀表板。")}
          </Typography>
          <Box mb={2}>
            <Typography variant="body1">
              {t("管理會員")}: <Typography variant="span" fontWeight="bold" ml={0.5}>{isLoading ? t('加載中...') : memberCount}</Typography>
            </Typography>
            {userRole === 'main' && (
              <Typography variant="body1">
                {t("管理管理員")}: <Typography variant="span" fontWeight="bold" ml={0.5}>0</Typography> {/* {t('副管理員數量佔位符')} */}
              </Typography>
            )}
          </Box>
          <Box>
            <Link href="/admin/manage-members" className={styles.dashboardLink} sx={{ mr: 2 }}>{t("管理會員")}</Link>
            {userRole === 'main' && (
              <Link href="/admin/manage-admins" className={styles.dashboardLink}>{t("管理管理員")}</Link>
            )}
          </Box>
          {error && <Typography variant="body2" color="error" mt={2}>{error}</Typography>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
