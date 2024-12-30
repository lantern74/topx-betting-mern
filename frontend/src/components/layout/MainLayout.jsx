import React, { Fragment } from 'react';
import TopNav from '../header/TopNav';
import Footer from '../footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <TopNav />
      {children}
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
