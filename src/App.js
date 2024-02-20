import { Routes, Route, Router } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import UserLoginForm from './components/UserLoginForm';
import ForgottPasswordForm from './components/ForgottPasswordForm';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import HomePage from './components/HomePage';
import VerifyEmail from './components/VerifyEmail';
import ResetPasswordPage  from './components/ResetPasswordPage';
import MyData from './components/MyData';
import GamesPage from './components/GamesPage';
import LobbyPage from './components/LobbyPage';
import TicTacToeGamePage from './components/TicTacToeGamePage';
import NineMensMorrisGame from './components/NineMensMorrisGame';

function App() {
  const [token, setToken] = useState(null);
  return (
    <div  className='h-screen bg-gray-200  justify-center '>
      <div className=" py-2 justify-center static mb-2">
        <Navbar/>
      </div>
      <div className=' flex justify-center' style={{ height: '87vh' }}>
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<UserLoginForm />} />
            <Route path="/forgott-password" element={<ForgottPasswordForm />} />
            <Route path='/reset-password' element={<ResetPasswordPage/>}/>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-data" element={<MyData />} />
            <Route path="/verify" element={<VerifyEmail/>} />
            <Route path="/games" element={<GamesPage/>}/>
            <Route path='/lobbies/:gameUrl' element={<LobbyPage/>}/>
            <Route path='/:gameUrl/:gameId' element={<TicTacToeGamePage/>}/>
            <Route path='/:gameUrl/:gameId' element={<NineMensMorrisGame/>}/>
        </Routes>
       </div>
       <footer className="bg-gray-800 text-white text-center py-4">
      <div className="container mx-auto">
        <p>&copy; 2024 My Awesome Website</p>
      </div>
    </footer>
      </div>
  );
}

export default App
