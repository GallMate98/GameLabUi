import React, { useState,  useEffect, useRef } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState("Loading");
  const [submitted, setSubmitted] = useState(false);
  const isMounted = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  useEffect(() => {
    if (!isMounted.current && submitted) {
      const fetchData = async () => {
        try {
          const searchParams = new URLSearchParams(window.location.search);
          const token = searchParams.get('token');

          if (!token) {
            setMessage('Token is missing.');
            return;
          }

          const encodedToken = encodeURIComponent(token);

          const response = await axios.post(`https://localhost:7267/api/User/reset-password?token=${encodedToken}`, formData);
          const data = response.data;
           console.log(data);
          setMessage(data);
        } catch (error) {

          if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
          } else {
            setMessage('An Error Occured');
          }
        }
      };

      fetchData();

      isMounted.current = true;
    }
  }, [submitted]); 






  return (
    <div className="flex justify-center h-screen">
      <div className="mx-auto mt-10 mb-10">
        {submitted ?(
        <div>
          <h1>Message</h1>
           {message ? (
           <p>{message}</p>
            ) : null}
        </div>
        ):( 
        <div>
          <div>
          <h1 className="text-6xl font-semibold text-black-500 mx-36 mb-8">Reset Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 ">
          {error && (
            <div className="text-red-500">
              Error during login: {error}
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
        </div>)
      }
      </div>
    </div>
  );
};

export default ResetPasswordPage;




