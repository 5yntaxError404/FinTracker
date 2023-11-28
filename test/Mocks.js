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
  
  const usersCollection = {
    findOne: jest.fn(),
    insertOne: jest.fn(),
  };
  
  const crypto = {
    randomBytes: jest.fn(() => ({ toString: () => 'mockVerificationToken' })),
  };
  

// REGISTRATION 
appTest.post('/api/register', async (req, res) => {
  const { FirstName, LastName, Email, UserName, Password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await usersCollection.findOne({ UserName });
    const existingEmail = await usersCollection.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already associated with another account.'});
    }

    var check = await usersCollection.findOne({ UserId: userCounter });

    do{
      // Increment the user counter and use it as UserId
      userCounter += 1;
      check = await usersCollection.findOne({ UserId: userCounter });

    }while(check) //make sure there is no dup userIDs

    //const oneTimePass = generateOneTimePass() -- may use this later on.
    const VerificationToken = crypto.randomBytes(32).toString('hex');
    const EmailURL = `https://www.fintech.davidumanzor.com/EmailVerification?token=${VerificationToken}`;

    const newUser = {
      UserId: userCounter,
      FirstName,
      LastName,
      Email,
      UserName,
      Password,
      VerificationToken,
      isVerified: false
    };

    // Insert the user document into the "Users" collection
    await usersCollection.insertOne(newUser);

    // Return a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// END OF REGISTRATION

// AUTHENTICATION ENDPOINTS


function checkPassComplexity(pass){
    
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasDigit = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(pass);
  
    // Check against complexity criteria
    const isLengthValid = pass.length >= minLength;
    const meetsComplexityCriteria = hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  
    // Return true if the password is sufficiently complex
    return isLengthValid && meetsComplexityCriteria;
}



module.exports = {
  usersCollection, 
  crypto, 
  authenticateUser,
  checkPassComplexity,
  
};