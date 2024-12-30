import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
        role: 'admin',
      });

      if (response.status === 200) {
        navigate('/admin/dashboard');
      } else {
        setError(t('登錄失敗'));
      }
    } catch (err) {
      setError(err.response?.data?.message || t('登錄時出錯'));
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

export default AdminLogin;
