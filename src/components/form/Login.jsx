import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import TopNav from '../../components/header/TopNav';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <Fragment>
            <div className="main-page-wrapper">
                <Helmet>
                    <title>TOP X</title>
                </Helmet>
                {/* helmet end */}

                <TopNav/> {/* theme-menu-four */}


                <div className="contact-section-one mb-170 lg-mb-120">
                   
                    <div className="mt-200 lg-mt-70">
                        <div className="container">
                            <div className="row gx-xxl-5">
                                <div className="col-lg-6 d-flex order-lg-last">
                                    <div className="form-style-one">
                                        <h3 className="form-title pb-40 lg-pb-20">帳戶登入</h3>
                                        <LoginForm/>
                                    </div>
                                    {/* /.form-style-one */}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.contact-section-one */}

                

            </div>
        </Fragment>
    )
}

export default Login