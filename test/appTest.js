const express = require('express');

const appTest = express();

// Mock user data
const users = [
    { id: 1, username: 'user1', password: 'password1', isVerified: true },
    { id: 2, username: 'user2', password: 'password2', isVerified: false }
  ];
  
  // Function to authenticate user
  function authenticateUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
  }
  
  // Login endpoint
  appTest.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists and authenticate
      const user = authenticateUser(username, password);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      if (!user.isVerified) {
        return res.status(400).json({ error: 'Email not yet verified.' });
      }
  
      // Generate a mock JWT token
      const accessToken = 'mockAccessToken';
  
      res.status(200).json({ message: 'Login successful', accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = {
  authenticateUser
};