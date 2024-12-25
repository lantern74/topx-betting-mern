import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const ThemeMainMenu = () => {
    return (
        <Fragment>
            <ul className="navbar-nav">
                <li className="d-block d-lg-none">
                    <div className="logo">
                        <Link to="/"><img src="images/logo/logo_01.png" alt="" width={130}/></Link>
                    </div>
                </li>
                <li className="nav-item">
                    <button className="nav-link dropdown-toggle" role="button" onClick={() => scrollToSection('homePage')}>主頁</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link dropdown-toggle" role="button" onClick={() => scrollToSection('raceRecords')}>賽事紀錄</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link dropdown-toggle" role="button" onClick={() => scrollToSection('contactUs')}>聯絡我們</button>
                </li>
            </ul>
        </Fragment>
    )
}
export default ThemeMainMenu