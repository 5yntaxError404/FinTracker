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
        {isVerified ? (
          <div className="verified-container">
            <div className="verified-circle">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#ffffff">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
            <p className="verified-text">Verified!</p>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          <p>Verifying...</p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
