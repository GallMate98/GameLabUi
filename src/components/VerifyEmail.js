import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState("Loading");

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      const fetchData = async () => {
        try {
          const searchParams = new URLSearchParams(window.location.search);
          const token = searchParams.get('token');

          if (!token) {
            setMessage('Token is missing.');
            return;
          }

          const encodedToken = encodeURIComponent(token);

          const response = await axios.get(`https://localhost:7267/api/User/verify?token=${encodedToken}`);
          const data = response.data;

          setMessage(data.message);
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
  }, []);

  return (
    <div>
      <h1>Message</h1>
      {message ? (
        <p>{message}</p>
      ) : null}
    </div>
  );
};

export default VerifyEmail;
