import React, {Fragment, useEffect } from 'react';
import {Link, useLocation } from 'react-router-dom';

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
const ScrollToHash = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            scrollToSection(id);
        }
    }, [location]);

    return null;
};


const ThemeMainMenu = () => {
    return (
        <>
            <ScrollToHash />
            <Fragment>
                <ul className="navbar-nav">
                    <li className="d-block d-lg-none">
                        <div className="logo">
                            <Link to="/"><img src="images/logo/logo_01.png" alt="" width={130}/></Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to="/#homePage" className="nav-link dropdown-toggle" role="button">主頁</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#raceRecords" className="nav-link dropdown-toggle" role="button">賽事紀錄</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#contactUs" className="nav-link dropdown-toggle" role="button">聯絡我們</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/view-matches" className="nav-link dropdown-toggle">賽事系統</Link>
                    </li>
                </ul>
            </Fragment>
        </>
    )
}
export default ThemeMainMenu