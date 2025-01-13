import React, { Fragment, useEffect, useRef } from "react";
import useMobileMenuStore from "../../store/mobileMenuStore.js";
import "./MobileMenu.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import useAuthStore from "../../store/authStore";
import ScrollToHash from "../common/ScrollToHash";

const MobileMenu = () => {
  const { t } = useTranslation();
  const { isOpen, toggle, close } = useMobileMenuStore();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close]);
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <ScrollToHash />
      <Fragment>
        <div className="mobile-menu-wrapper">
          <ProSidebar
            ref={menuRef}
            className={isOpen ? "mobile-menu menu-open" : "mobile-menu"}
          >
            <SidebarHeader>
              <div className="mobile-logo">
                <Link to="/">
                  <img
                    className="responsive-logo"
                    src="images/logo/topx-logo.png"
                    alt=""
                  />
                </Link>
              </div>
              <div className="close-menu" onClick={close}>
                <i class="bi bi-x-lg"></i>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem>
                  <Link to="/#homePage">{t("主頁")}</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/#raceRecords">{t("賽事紀錄")}</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/#contactUs">{t("聯絡我們")}</Link>
                </MenuItem>
                {!isAuthenticated && (
                  <MenuItem>
                    <Link to="/view-matches">{t("賽事系統")}</Link>
                  </MenuItem>
                )}
                {!isAuthenticated && (
                  <MenuItem>
                    <Link to="/login">{t("會員登入")}</Link>
                  </MenuItem>
                )}
                {isAuthenticated &&
                  (userRole === "main" || userRole === "sub") && (
                  <MenuItem>
                    <Link to={userRole === "main" ? "/admin" : "/subadmin"}>
                      {t("管理")}
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              {isAuthenticated && (
                <Menu iconShape="square" className="no-border-menu">
                  <MenuItem className="no-border-item">
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="logout-btn"
                    >
                      {t("登出")}
                    </button>
                  </MenuItem>
                </Menu>
              )}
            </SidebarFooter>
          </ProSidebar>
        </div>
      </Fragment>
    </>
  );
};

export default MobileMenu;
