import React, { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import UserAnalysis from '../views/UserAnalysis';
import Login from '../components/form/Login';
import NotFound from "../views/NotFound";

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<UserAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default AppRouter