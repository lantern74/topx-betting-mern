import React, {Fragment, useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'
import {
    ProSidebar,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    Menu,
    MenuItem,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const MobileMenu = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }
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

    return (
      <>
        <ScrollToHash />
        <Fragment>
            <div className="mobile-menu-wrapper">
            <div className="moblie-menu-toggler">
                            <button className={click ? "navbar-toggler active d-block d-lg-none": "navbar-toggler d-block d-lg-none"} type="button" onClick={handleClick}>
                                <span/>
                            </button>
                        </div>
                <ProSidebar
                    className={click
                    ? 'mobile-menu menu-open'
                    : 'mobile-menu'}>
                    <SidebarHeader>
                        <div className="mobile-logo">
                            <Link to="/"><img className='responsive-logo' src="images/logo/topx-logo.png" alt=""/></Link>
                        </div>
                       <div className="close-menu" onClick={handleClick}>
                        <i class="bi bi-x-lg"></i>
                       </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                          <MenuItem>
                            <Link to='/#homePage'>主頁</Link>
                          </MenuItem>
                          <MenuItem>
                            <Link to='/#raceRecords'>賽事紀錄</Link>
                          </MenuItem>
                          <MenuItem>
                            <Link to='/#contactUs'>聯絡我們</Link>
                          </MenuItem>
                          <MenuItem>
                            <Link to='/view-matches'>賽事系統</Link>
                          </MenuItem>
                          <MenuItem>
                            <Link to='/login'>會員登入</Link>
                          </MenuItem>
                        </Menu>
                    </SidebarContent>

                    <SidebarFooter></SidebarFooter>
                </ProSidebar>
            </div>
        </Fragment>
      </>
    )
}

export default MobileMenu