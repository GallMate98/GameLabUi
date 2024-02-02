import { Routes, Route, Router } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import UserLoginForm from './components/UserLoginForm';
import ForgottPasswordForm from './components/ForgottPasswordForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import VerifyEmail from './components/VerifyEmail';
import ResetPasswordPage  from './components/ResetPasswordPage';
import MyData from './components/MyData';

function App() {
  const [token, setToken] = useState(null);
  return (
    <div  className='h-screen bg-gray-200  justify-center '>
      <div className=" py-2 justify-center static mb-2">
        <Navbar/>
      </div>
      <div className=' flex justify-center min-h-screen-100px '>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/forgott-password" element={<ForgottPasswordForm />} />
        <Route path='/reset-password' element={<ResetPasswordPage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-data" element={<MyData />} />
        <Route path="/verify" element={<VerifyEmail/>} />
       </Routes>
       </div>
      </div>
  );
}

export default App
