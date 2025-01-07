import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MobileMenu from "./MobileMenu";
import ThemeMainMenu from "./ThemeMainMenu";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const toggleMenu = () => {
    if (window.scrollY >= 68) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) { // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY) { // Scrolling up
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      toggleMenu();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Fragment>
      {/* <SearchModal isOpen={modalIsOpen} onClick={closeModal} bgColor="bg-three" /> */}
      <header
        className={`theme-main-menu sticky-menu theme-menu-four ${
          navbar ? "fixed" : ""
        } ${visible ? "" : "hidden"}`}
        style={{
          transition: "transform 0.3s ease",
          transform: visible ? "translateY(0)" : "translateY(-100%)"
        }}
      >
        <div className="inner-content">
          <div className="d-flex align-items-center">
            <div className="logo order-lg-0">
              <Link to="/" className="d-block">
                <img
                  src="/images/logo/topx-logo.png"
                  alt="TOPX Logo"
                  style={{ 
                    height: "70px" 
                  }}
                />
              </Link>
            </div>
            <div className="right-widget d-flex align-items-center ms-auto order-lg-3 d-none d-lg-flex">
              {!isAuthenticated
                ? (
                  <Link to="/login" className="send-msg-btn tran3s">
                    {t("登入")}
                  </Link>
                )
                : (
                  <button
                    onClick={() => {
                      let redirectPath = "/login";
                      if (userRole === "main") {
                        redirectPath = "/admin/login";
                      } else if (userRole === "sub") {
                        redirectPath = "/subadmin/login";
                      }
                      logout();
                      navigate(redirectPath);
                    }}
                    className="send-msg-btn tran3s"
                  >
                    {t("登出")}
                  </button>
                )}
            </div>
            <nav className="navbar navbar-expand-lg order-lg-2">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ThemeMainMenu />
                {isAuthenticated &&
                  (userRole === "main" || userRole === "sub") && (
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        to={userRole === "main" ? "/admin" : "/subadmin"}
                        className="nav-link"
                      >
                        {t("管理")}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
            <span className="mobile-seperator"></span>
            <MobileMenu />
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default TopNav;
