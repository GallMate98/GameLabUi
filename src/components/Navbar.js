import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">GameLab</div>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white mx-4">Profile</Link>
              <Link to="/logout" className="text-white mx-4" onClick={handleLogout}>Logout</Link>
              <Link to="/games" className="text-white mx-4">Games</Link>
              <Link to="/search-users" className="text-white mx-4">Search Users</Link>
              <span className="text-white mx-4">{username}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-4">Sign In</Link>
              <Link to="/register" className="text-white mx-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
