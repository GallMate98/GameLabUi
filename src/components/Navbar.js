import React, { useEffect, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [jwtToken , setJwtToken] = useState('');
  const [roles, setRoles] = useState();
  const navigate = useNavigate();

  const getTokenRoles = (jwtToken) => {
    const decodedTokenBody = jwtDecode(jwtToken);
    console.log(decodedTokenBody);
    const userRole = decodedTokenBody['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
    setRoles(userRole);
    console.log("My roles "+roles);
  };

  useEffect(() => {
    console.log(isLoggedIn);
    const token = sessionStorage.getItem('jwtToken');
    const user = sessionStorage.getItem('username');
    
    if (token && user) {
      setUsername(user);
      setJwtToken(token);
      setIsLoggedIn(true);
      getTokenRoles(token);
      console.log(verifyIsModerator(roles));

    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUsername('');
    setJwtToken('');
    navigate("/");
    window.location.reload();
  };
  const verifyIsModerator = roles => {
    if (roles === undefined) {
      return false; 
    }

    if(typeof roles === 'string') {
      return false;
    }

    const moderatorRole = roles.find(role => role === 'Moderator');
    
    return moderatorRole !== undefined;
  };

  const verifyIsAdmin = roles => {
    if (roles === undefined) {
      return false; 
    }

    if(typeof roles === 'string') {
      return false;
    }

    const adminRole = roles.find(role => role === 'Admin');
    
    return adminRole !== undefined;
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">GameLab</div>
        <div>
          {isLoggedIn ? (
            <>
            { verifyIsAdmin(roles) ?(
           <div style={{ display: "flex", justifyContent: "flex-end" }}>
             <Link to="/users" className="text-white mx-4">Users</Link>
             <Link to="/admins" className="text-white mx-4">Admins</Link>
             <Link to="/moderators" className="text-white mx-4">Moderator</Link>
             <Link to="/ban-account" className="text-white mx-4">Ban Account</Link>
             <Link to="/my-data" className="text-white mx-4">Profile {username}</Link>
             <Link to="/games" className="text-white mx-4">Games</Link>
             <Link to="/search-users" className="text-white mx-4">Search Users</Link>
             <Link to="/" className="text-white mx-4" onClick={handleLogout}>Logout</Link>
         </div>
            ): verifyIsModerator(roles) ? (<>
             <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/users" className="text-white mx-4">Users</Link>
              <Link to="/moderators" className="text-white mx-4">Moderator</Link>
              <Link to="/ban-account" className="text-white mx-4">Ban Account</Link>
              <Link to="/my-data" className="text-white mx-4">Profile {username}</Link>
              <Link to="/games" className="text-white mx-4">Games</Link>
              <Link to="/search-users" className="text-white mx-4">Search Users</Link>
              <Link to="/" className="text-white mx-4" onClick={handleLogout}>Logout</Link>
              </div>
            </>) :
            (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                 <Link to="/my-data" className="text-white mx-4">Profile {username}</Link>
                 <Link to="/games" className="text-white mx-4">Games</Link>
                 <Link to="/search-users" className="text-white mx-4">Search Users</Link>
                 <Link to="/" className="text-white mx-4" onClick={handleLogout}>Logout</Link>
                 </div>
            )
              }
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
