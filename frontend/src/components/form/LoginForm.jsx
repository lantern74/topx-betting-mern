import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { api, handleApiError } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

    //for validation
    const validationSchema = Yup
        .object()
        .shape({
            email: Yup
                .string()
                .required(t("名稱不能為空")),
            password: Yup
                .string()
                .required(t("請輸入訊息"))
        });

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

    const onSubmit = async (data, e) => {
      e.preventDefault();
      setError('');
      try {
        const response = await api.post('/member/login', {
          username: data.email,
          password: data.password,
        });
  
        if (response.status === 200) {
          login('member', response.data.token);
          navigate('/');
        }
      } catch (err) {
        const message = handleApiError(err);
        setError(message || t('登錄時出錯'));
      }
    };

    return (
        <Fragment>
            <form id="contact-form" action="#" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-12">
                        <div className="input-group-meta form-group mb-30">
                            <label>{t("用戶名")}*</label>
                            <input type="text" name="email" {...register("email")}
                        className={`${errors.email ? "is-invalid" : ""}`}
                        /> 
                        {errors.email && (
                        <div className="invalid-feedback">{errors.email
                                ?.message}</div>
                    )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group-meta form-group mb-30">
                            <label>{t("密碼")}*</label>
                            <input type="password"  name="password" {...register("password")}
                        className={`${errors.password ? "is-invalid" : ""}`}
                        /> 
                        {errors.password && (
                        <div className="invalid-feedback">{errors.password
                                ?.message}</div>
                    )}
                        </div>
                    </div>
                    {error && (
                      <div className="col-12">
                        <div className="invalid-feedback">{error}</div>
                      </div>
                    )}
                    <div className="col-12 mt-3 d-flex" style={{justifyContent:"space-between"}}>
                        <button className="btn-eight ripple-btn">{t("提交")}</button>
                        <a className='register-button' href="https://t.me/Systemtopxpro" target='_blank' rel="noreferrer">{t("註冊帳號")}</a>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default LoginForm;
