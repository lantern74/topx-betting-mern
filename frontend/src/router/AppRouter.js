import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../views/Landing";
import Login from "../components/form/Login";
import ViewMatches from "../components/matches/ViewMatches";
import MatchResult from "../components/matches/MatchResult";
import NotFound from "../views/NotFound";
import DeveloperPage from "../components/developer/DeveloperPage";
import AdminLogin from "../components/admin/AdminLogin";
import SubAdminLogin from "../components/admin/SubAdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ManageMembers from "../components/admin/ManageMembers";
import ManageAdmins from "../components/admin/ManageAdmins";

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/subadmin/login" element={<SubAdminLogin />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<Landing />} />
                <Route path="/subadmin" element={<Landing />} />
                <Route path="/view-matches" element={<ViewMatches />} />
                <Route path="/match-result/:id" element={<MatchResult />} />
                <Route path="/developer/language" element={<DeveloperPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/manage-members"
          element={
            <AdminLayout>
              <ManageMembers />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/manage-admins"
          element={
            <AdminLayout>
              <ManageAdmins />
            </AdminLayout>
          }
        />
        <Route
          path="/subadmin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/subadmin/manage-members"
          element={
            <AdminLayout>
              <ManageMembers />
            </AdminLayout>
          }
        />
        <Route
          path="/subadmin/manage-admins"
          element={
            <AdminLayout>
              <ManageAdmins />
            </AdminLayout>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
