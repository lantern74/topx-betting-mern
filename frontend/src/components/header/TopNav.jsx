import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';
import ThemeMainMenu from './ThemeMainMenu';
import useAuthStore from '../../store/authStore';
import i18n from '../../i18n';

const TopNav = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuthStore();
    const [navbar, setNavbar] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(!modalIsOpen);
    }

    const toggleMenu =()=>{
        if(window.scrollY >= 68) {
            setNavbar(true)
        } else{
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', toggleMenu);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguageDropdownOpen(false);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownOpen(!languageDropdownOpen);
    };


    return (
        <Fragment>
            {/* <SearchModal isOpen={modalIsOpen} onClick={closeModal} bgColor="bg-three" /> */}
            <header className={navbar ? "theme-main-menu sticky-menu theme-menu-four fixed": "theme-main-menu sticky-menu theme-menu-four"}>
                <div className="inner-content">
                    <div className="d-flex align-items-center">
                        <div className="logo order-lg-0">
                            <Link to="/" className="d-block">
                                <span className="logo-text">TOPX</span>
                                {/* <img className='responsive-logo' src="images/logo/topx-logo.png" alt=""/> */}
                            </Link>
                        </div>
                        <div className="right-widget d-flex align-items-center ms-auto order-lg-3">
                            <div className="language-switcher" onMouseEnter={toggleLanguageDropdown} onMouseLeave={toggleLanguageDropdown}>
                                <div className="current-language">
                                    {i18n.language === 'en' ? <img src="/images/icon/us.svg" alt="English" /> : <img src="/images/icon/china.svg" alt="Chinese" />}
                                </div>
                                {languageDropdownOpen && (
                                    <div className="language-dropdown">
                                        <button onClick={() => changeLanguage('en')}>
                                            <img src="/images/icon/us.svg" alt="English" /> English
                                        </button>
                                        <button onClick={() => changeLanguage('zh')}>
                                            <img src="/images/icon/china.svg" alt="Chinese" /> 中文
                                        </button>
                                    </div>
                                )}
                            </div>
                            {!isAuthenticated && (
                                <Link to="/login" className="send-msg-btn tran3s d-none d-lg-block">{t("登入")}</Link>
                            )}
                        </div>
                        <nav className="navbar navbar-expand-lg order-lg-2">
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ThemeMainMenu/>
                            </div>
                        </nav>
                    </div>
                    <MobileMenu />
                </div>
            </header>
        </Fragment>
    )
}

export default TopNav
