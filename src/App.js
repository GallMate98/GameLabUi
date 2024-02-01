import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import UserLoginForm from './components/UserLoginForm';
import ForgottPasswordForm from './components/ForgottPasswordForm';
import Navbar from './components/Navbar';
import ResetPasswordForm from './components/ResetPasswordForm'
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import VerifyEmail from './components/VerifyEmail';

function App() {
  const [token, setToken] = useState(null);
  return (

    <div>
    <div className=" py-2 justify-center static mb-2">
        <Navbar/>
    </div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/forgott-password" element={<ForgottPasswordForm />} />
        <Route path='/reset-password' element={<ResetPasswordForm/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifyEmail/>} />
      </Routes>
     
    </div>
  );
}

export default App
