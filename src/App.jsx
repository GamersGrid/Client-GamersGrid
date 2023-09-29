import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage"
import Signup from './pages/SignupPage';
import TournamentListPage from './pages/TournamentListPage';
import IsAnon from './components/isAnon';
import IsPrivate from './components/IsPrivate';
import AddTournamentPage from './pages/AddTournamentPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import EditTournamentPage from './pages/EditTournamentPage';
import AddGamePage from './pages/AddGamePage';
import UserProfile from './components/Profile';
function App() {


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<IsPrivate><UserProfile /></IsPrivate>} />
        <Route path="/tournaments" element={<TournamentListPage />} />
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
        <Route path="/addtournament" element={<IsPrivate><AddTournamentPage /></IsPrivate>} />
        <Route path="/tournaments/:tournamentId" element={<IsPrivate><TournamentDetailsPage /></IsPrivate>} />
        <Route path="/tournaments/edit/:tournamentId" element={<EditTournamentPage />} />
        <Route path="/games/create" element={<AddGamePage />} />
        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />
      </Routes>
    </>
  )
}

export default App
