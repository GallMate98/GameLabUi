import React, { useState } from 'react';
import axios from 'axios';

const ForgottPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    var myEmail= formData.email;
    const encodedEmail = encodeURIComponent(myEmail);
    console.log(encodedEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://localhost:7267/api/User/forgot-password?email=${encodedEmail}`, formData)
    .then(response => {
      console.log(response.data);
    
    })
    .catch(error => {
      console.error('Hiba a regisztráció során:', error);

    });
  };

  return ( 
  <div className="flex justify-center h-screen">
    <div className=" mx-auto mt-12 mb-12">
        <div>
            <h1 className="text-4xl font-semibold text-black-500 mx-36 mb-8">Add email for reset your password</h1>
        </div>
      <form onSubmit={handleSubmit} className="space-y-5 ">
          {error && (
            <div className="text-red-500">
              Hiba a regisztráció során: {error.message}
            </div>
          )}
        <div>  
        <div>
          <label htmlFor="email" className="  block  text-base font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className=" mt-1 p-2 border border-gray-300 rounded-md w-full mb-5"
            required
          />
        </div>
       </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ForgottPasswordForm;