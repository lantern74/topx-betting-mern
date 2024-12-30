import React, { Fragment } from 'react';
import TopNav from '../header/TopNav';

const PublicLayout = ({ children }) => {
  return (
    <Fragment>
      <TopNav />
      {children}
    </Fragment>
  );
};

export default PublicLayout;
