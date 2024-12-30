import React, { Fragment } from 'react';
import TopNav from '../header/TopNav';

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <TopNav />
      {children}
    </Fragment>
  );
};

export default MainLayout;
