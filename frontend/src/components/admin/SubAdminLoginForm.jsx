import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api, handleApiError } from '../../utils/api';
import useAuthStore from '../../store/authStore';

const SubAdminLoginForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/admin/login', {
        username,
        password,
      });

      if (response.status === 200) {
        login('sub');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      const message = handleApiError(err);
      setError(message || t('登錄時出錯'));
    }
  };

  return (
    <Fragment>
      <form id="contact-form" action="#" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <label>{t("用戶名")}*</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={error ? "is-invalid" : ""}
                autoComplete="username"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta form-group mb-30">
              <label>{t("密碼")}*</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "is-invalid" : ""}
              />
            </div>
          </div>
          {error && (
            <div className="col-12">
              <div className="invalid-feedback">{error}</div>
            </div>
          )}
          <div className="col-12 mt-3">
            <button className="btn-eight ripple-btn" type="submit">{t("登錄")}</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SubAdminLoginForm;
