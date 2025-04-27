
import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// NOTE: GitHub Pages'de sayfa yenileme sorunlarını önlemek için HashRouter kullanıldı.
import Navbar from './components/Navbar';
import Game from './components/Game';
import Rules from './components/Rules';
import GameInfo from './components/GameInfo';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<GameInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
