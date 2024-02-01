import React, { useState, useEffect } from 'react';

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    // Function to extract the token from the URL
    const getTokenFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('token');
    };

    // Fetching data from the API
    const verifyToken = async (token) => {
      try {
        const response = await fetch(`https://localhost:7267/api/User/verify?token=${token}`);
        const data = await response.json();
        setVerificationStatus(data.message);
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerificationStatus('Error verifying token');
      }
    };

    // Getting the token from the URL and verifying
    const token = getTokenFromUrl();
    if (token) {
      verifyToken(token);
    } else {
      setVerificationStatus('Token not found in the URL');
    }
  }, [verificationStatus]); // Módosítás: a verificationStatus hozzáadása a függőségekhez

  return (
    <div>
      <h1>Verification Status</h1>
      {verificationStatus !== null ? (
        <p>{verificationStatus}</p>
      ) : (
        <p>Verifying...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
