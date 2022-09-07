import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect, useState } from 'react';

function App() {
  const getTheme = () => {
    return JSON.parse(localStorage.getItem('theme')) || false;
  };
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <div className={theme ? 'theme-dark' : ''}>
      <div className="content-bg-color main-content">
        <BrowserRouter>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
