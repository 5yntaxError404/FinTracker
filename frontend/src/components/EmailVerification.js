import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const verificationToken = new URLSearchParams(window.location.search).get('token');

      if (verificationToken) {
        try {
          const response = await fetch(`https://www.fintech.davidumanzor.com/verify-email?token=${verificationToken}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
          });

          // Assuming your server responds with a success status when verification is successful
          if (response.status === 200) {
            setIsVerified(true);
          } else {
            setIsVerified(false);
          }
        } catch (error) {
          console.error(error);
          alert('Email verification failed. Verification token: ' + verificationToken);
        }
      } else {
        alert('Invalid verification link.');
      }
    };

    verifyEmail();
  }, []); // Run the effect only once when the component mounts

  // Redirect to login after verification with a 3-second delay
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (isVerified) {
        // Redirect to the login page
        navigate('/Login');
      }
    }, 3000); // Adjust the delay to 3000 milliseconds (3 seconds)

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(redirectTimeout);
  }, [isVerified, navigate]);

  return (
    <div className="landing-container">
      <div className="content">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
        {isVerified ? <p>Verified! Redirecting to login...</p> : <p>Verifying...</p>}
      </div>
    </div>
  );
};

export default EmailVerification;
