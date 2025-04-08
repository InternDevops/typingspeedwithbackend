import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import TypingTest from "./pages/TypingTest";
import Leaderboard from "./pages/Leaderboard";
import "./index.css";

function App() {
  return (
    <div className=".app-container">
    <Router>
      <div className="navbar">
        <NavLink to="/" className="nav-link" activeClassName="active-link">Typing Test</NavLink>
        <NavLink to="/leaderboard" className="nav-link" activeClassName="active-link">Leaderboard</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<TypingTest />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
