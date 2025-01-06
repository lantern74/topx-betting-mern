import React, { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../store/authStore";

import ScrollToHash from "../common/ScrollToHash";

const ThemeMainMenu = () => {
  const { t } = useTranslation();
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <>
      <ScrollToHash />
      <Fragment>
        <ul className="navbar-nav">
          <li className="d-block d-lg-none">
            <div className="logo">
              <Link to="/">
                <img src="images/logo/logo_01.png" alt="" width={130} />
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/#homePage"
              className="nav-link dropdown-toggle"
              role="button"
            >
              {t("主頁")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/#raceRecords"
              className="nav-link dropdown-toggle"
              role="button"
            >
              {t("賽事紀錄")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/#contactUs"
              className="nav-link dropdown-toggle"
              role="button"
            >
              {t("聯絡我們")}
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/view-matches" className="nav-link dropdown-toggle">
                {t("賽事系統")}
              </Link>
            </li>
          )}
        </ul>
      </Fragment>
    </>
  );
};
export default ThemeMainMenu;
