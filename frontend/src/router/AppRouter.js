import React, { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from '../views/Landing';
import Login from '../components/form/Login';
import ViewMatches from '../components/matches/ViewMatches'
import MatchResult from '../components/matches/MatchResult'
import NotFound from "../views/NotFound";
import DeveloperPage from '../components/developer/DeveloperPage';
import AdminLogin from '../components/admin/AdminLogin';
import SubAdminLogin from '../components/admin/SubAdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import MainLayout from '../components/layout/MainLayout';
import PublicLayout from '../components/layout/PublicLayout'; // Import the PublicLayout

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        } />
        <Route path="/admin/login" element={
          <PublicLayout>
            <AdminLogin />
          </PublicLayout>
        } />
        <Route path="/subadmin/login" element={
          <PublicLayout>
            <SubAdminLogin />
          </PublicLayout>
        } />
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/view-matches" element={<ViewMatches />} />
              <Route path="/match-result/:id" element={<MatchResult />} />
              <Route path="/developer/language" element={<DeveloperPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Fragment>
  )
};

export default AppRouter
