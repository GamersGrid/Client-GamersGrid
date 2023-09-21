import { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage"
import Signup from './pages/SignupPage';
import TournamentListPage from './pages/TournamentListPage';
import IsAnon from './components/isAnon';
import IsPrivate from './components/IsPrivate';

function App() {
  

  return (
    <>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<HomePage/>} />

        <Route path="/tournaments" element={<TournamentListPage/>}/>
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />

      </Routes>
    </>
  )
}

export default App
