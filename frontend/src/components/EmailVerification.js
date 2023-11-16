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
            const response = await fetch(`https://www.fintech.davidumanzor.com/verify-email?token=${verificationToken}`);
            if (response.ok) {
              const data = await response.json();
              alert(data.message); // Display a success message
            } else {
              throw new Error('Email verification failed.');
            }
          } catch (error) {
            console.error(error);
            alert('Email verification failed.');
          }
        } else {
          alert('Invalid verification link.');
        }
      };
  
      verifyEmail();
    }, []); // Run the effect only once when the component mounts
}



export default EmailVerification;