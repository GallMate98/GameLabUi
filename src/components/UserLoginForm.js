import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import LoginResponse from './LoginResponse';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const UserLoginForm = ({ setToken }) => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
  const [messageReceived, setMessageReceived] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRedirect = () => {
    console.log(message);
    navigate('/');
  };

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7267/api/User/login', formData)
      .then(response => {
        console.log(response.data);
        const my = response.data.message;
        console.log(my);
        setResponseData(response.data);
        setMessage(response.data.message);
        handleRedirect();
      })
      .catch(error => {
        console.error('Error during login:', error);
        if (error.response && error.response.data) {
          console.log('Server response:', error.response.data);
          setError(error.response.data);
        } else {
          console.log('An error occurred:', error.message);
          setError('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="mx-auto mt-12 mb-12">
        <div>
          <h1 className="text-6xl font-semibold text-black-500 mx-36 mb-8">Login:</h1>
        </div>
        {message && <LoginResponse message={message} />}
        <form onSubmit={handleSubmit} className="space-y-5 ">
          {error && (
            <div className="text-red-500">
              Error during login: {error}
            </div>
          )}
          {message && (
            <div className="text-green-500">
              {message}
            </div>
          )}
          <div>
            <label htmlFor="userName" className="block text-base font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              placeholder="Enter your username"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-5"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-5"
              required
            />
          </div>
          <div className="flex-sb-m w-full p-t-3 p-b-32">
            <div>
              <div>
                <a href="/forgott-password">Forgot Password?</a>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {redirectAfterLogin && handleRedirect()}
    </div>
  );
};

export default UserLoginForm;
