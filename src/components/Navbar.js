import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {
  const [user, setUser] = useState('');
  const history = useNavigate();

  const handleDeleteLocalStorage = () => {
    localStorage.clear();
    history('/login');
  };

  useEffect(() => {
    setUser(localStorage.getItem('user'));

    if (!localStorage.getItem('user')) {
      history('/login');
    } else {
      history('/home');
    }
  }, [localStorage.getItem('user')]);

  return (
    <div className="navbar-content">
      <Link to={!!user ? '/home' : 'login'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 60 60" fill="currentColor" color="#1C86FA">
          <path
            id="popupsmart"
            d="M56.627,12.279a22.441,22.441,0,0,0-9.549-9.074c-4.122-2.088-8.951-3.2-15.722-3.2H28.644c-6.769,0-11.6,1.112-15.72,3.2a22.425,22.425,0,0,0-9.551,9.072C1.174,16.191,0,20.783,0,27.214v5.578c0,6.434,1.173,11.024,3.373,14.934A22.412,22.412,0,0,0,12.924,56.8c4.12,2.094,8.949,3.206,15.72,3.206h2.711c6.771,0,11.6-1.112,15.72-3.206a22.427,22.427,0,0,0,9.551-9.072c2.2-3.91,3.373-8.5,3.373-14.934V27.216C60,20.78,58.827,16.19,56.627,12.279ZM30,45.006c-.237,0-.473-.005-.708-.015l-.211-.012c-.14-.008-.28-.019-.419-.031-.123-.011-.245-.022-.367-.036l-.191-.024a14.979,14.979,0,0,1-2.672-.59V44.3a14.861,14.861,0,0,1-6.294-3.955,1.406,1.406,0,1,0-2.036,1.94,17.648,17.648,0,0,0,8.33,4.944v.354a5.214,5.214,0,1,1-10.428,0V30.046c0-.013,0-.026,0-.039a15,15,0,1,1,15,15Z"
            transform="translate(0 -0.005)"
          ></path>
        </svg>
      </Link>
      <Link to={!!user ? '/home' : 'login'}>Popupsmart React Practicum - Todo App</Link>
      <div>
        <label htmlFor="mode-change">Dark Mode {theme ? 'Kapat' : 'Aç'}</label>
        <input id="mode-change" name="mode-change" type="checkbox" onChange={() => setTheme(!theme)} checked={theme ? 'true' : ''} />
      </div>
      <Link to="/login">
        {user && (
          <>
            <span className="username">{user}</span>
            <span onClick={handleDeleteLocalStorage}> Çıkış yap</span>
          </>
        )}
      </Link>
    </div>
  );
};

export default Navbar;
