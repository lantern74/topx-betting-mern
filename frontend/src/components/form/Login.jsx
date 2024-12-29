import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';

const Login = () => {
    const { t } = useTranslation();
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
                                        <h3 className="form-title pb-40 lg-pb-20">{t("會員登入")}</h3>
                                        <LoginForm/>
                                    </div>
                                    {/* /.form-style-one */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login
