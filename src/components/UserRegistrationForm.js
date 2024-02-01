import React, { useState } from 'react';
import axios from 'axios';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    roles: [],
  });

  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7267/api/User/register', formData)
    .then(response => {
      console.log(response.data);
      // Sikeres regisztráció kezelése
    })
    .catch(error => {
      console.error('Hiba a regisztráció során:', error);
      // Regisztrációs hiba kezelése
    });
  };

  if (registered) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <p className="text-green-500"> Registration successful! Please login</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen">
    <div className="mx-auto mt-12 mb-12">
      <div>
      <h1 className="text-5xl font-semibold text-black-500 mx-36 mb-4">Please Register</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500">
              Hiba a regisztráció során: {error.message}
            </div>
          )}
      <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            placeholder='Enter you are First Name'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            placeholder='Enter you are Last Name'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder='Enter you are Email'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            placeholder='Enter you are Username'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder='Enter you are Password'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder='Enter confirm Password'
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UserRegistrationForm;
