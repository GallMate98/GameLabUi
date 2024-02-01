import React, { useState } from 'react';
import axios from 'axios';
import { Link, Routes } from 'react-router-dom';
import LoginResponse from './LoginResponse'; 
import { Route } from 'react-router-dom';

const UserLoginForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  
  });
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7267/api/User/reset-password', formData)
    .then(response => {
      console.log(response.data);
      setMessage(response.data.message);
      setResponseData(response.data);
    
    })
    .catch(error => {
      console.error('Hiba a regisztráció során:', error);
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
      <div className="mx-auto mt-10 mb-10">
        <div>
          <h1 className="text-6xl font-semibold text-black-500 mx-36 mb-8">Reset Password</h1>
        </div>
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
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your new password"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-5"
              required
            />
          </div>
          <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
                </label>
                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Enter confirm password"
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-5"
                required
                />
            </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <Routes>
      <Route path="/register" element={<LoginResponse  message={message} />}/>
      </Routes>
     
    </div>
  );
};

export default UserLoginForm;




