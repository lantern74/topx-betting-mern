import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import AdminLoginForm from "./AdminLoginForm";
import useAdminLogin from "../../hooks/useAdminLogin";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useAdminLogin();
  const [loginError, setLoginError] = useState(null);

  const handleAdminLogin = async (credentials) => {
    try {
      const data = await mutateAsync(credentials);
      login(data.role);
      navigate('/admin/dashboard');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <Fragment>
      <div className="main-page-wrapper">
        <Helmet>
          <title>TOP X</title>
        </Helmet>
        <div className="contact-section-one ">
          <div className="mt-200 lg-mt-70">
            <div className="container">
              <div className="row gx-xxl-5">
                <div className="col-lg-6 d-flex order-lg-last">
                  <div className="form-style-one">
                    <h3 className="form-title pb-40 lg-pb-20">
                      {t("管理員登入")}
                    </h3>
                    <AdminLoginForm onSubmit={handleAdminLogin} loading={isLoading} error={loginError} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
