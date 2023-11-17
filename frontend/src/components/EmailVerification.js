import React, { useEffect } from 'react';
import '../css/LandingPage.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// Looking for correct code to import font

const EmailVerification = () => {

    useEffect(() => {
      const verifyEmail = async () => {
        const verificationToken = new URLSearchParams(window.location.search).get('token');
  
        if (verificationToken) {
          try {
            const response = await fetch(`https://www.fintech.davidumanzor.com/verify-email?token=${verificationToken}`, {

				method: 'post',
				headers: { 'Content-Type': 'application/json' }
			});
          } catch (error) {
            console.error(error);
            alert('Email verification failed. verification token: ' + verificationToken);
          }
        } else {
          alert('Invalid verification link.');
        }
      };
  
      verifyEmail();
    }, []); // Run the effect only once when the component mounts

    return (

        <div className="landing-container">
            <div className="content">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono"></link>
                <p>Verifying...</p>
               
            </div>
        </div>
    );
}



export default EmailVerification;