import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import SubAdminLoginForm from "./SubAdminLoginForm";
import useSubAdminLogin from "../../hooks/useSubAdminLogin";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const SubAdminLogin = () => {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useSubAdminLogin();
  const [loginError, setLoginError] = useState(null);

  const handleSubAdminLogin = async (credentials) => {
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
                      {t("副管理員登入")}
                    </h3>
                    <SubAdminLoginForm onSubmit={handleSubAdminLogin} loading={isLoading} error={loginError} />
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

export default SubAdminLogin;
