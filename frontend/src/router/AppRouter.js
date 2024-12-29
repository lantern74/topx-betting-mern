import React, { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from '../views/Landing';
import Login from '../components/form/Login';
import ViewMatches from '../components/matches/ViewMatches'
import MatchResult from '../components/matches/MatchResult'
import NotFound from "../views/NotFound";
import DeveloperPage from '../components/developer/DeveloperPage';

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-matches" element={<ViewMatches />} />
        <Route path="/match-result/:id" element={<MatchResult />} />
        <Route path="/developer/language" element={<DeveloperPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default AppRouter
