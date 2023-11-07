// Server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();
const emailValidator = require('deep-email-validator');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { generateOneTimePass, verifyEmail } = require('./mailing');
require('dotenv/config');
const port = process.env.PORT || 5000; // Heroku set port
const app = express();

const bcrypt = require ("bcrypt");
app.use(cors());
app.use(bodyParser.json());

const url =
process.env.DB_CONNECTION;

const client = new MongoClient(url);

// ROOT GET
if (process.env.NODE_ENV === 'production')
{
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) =>
  {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
  'Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});


async function main() {
    try {
      await client.connect();
        
      console.log('Connected to MongoDB');
      const db = client.db('FinanceBuddy');
      const usersCollection = db.collection('Users');
      const accCollection = db.collection('Accounts');
     
      app.listen(port, () => {
        console.log(`Server is running on ${port}`);
      });
  
   // Define a variable for the user counter
let userCounter = 665;


// Register a new user
app.post('/api/register', async (req, res) => {
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

    const oneTimePass = generateOneTimePass()
    
    const newUser = {
      UserId: userCounter,
      FirstName,
      LastName,
      UserId: userCounter,
      Email,
      UserName,
      Password,
      VerificationToken: bcrypt.hash(oneTimePass, 8),
      isVerified: false
    };

    
    verifyEmail(newUser.Email,oneTimePass);
    // Insert the user document into the "Users" collection
    await usersCollection.insertOne(newUser);


    // Return a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
      // Authenticate a user
      app.post('/api/login', async (req, res) => {
        const { UserName, Password } = req.body;
  
        try {
          // Check if the user exists
          const user = await usersCollection.findOne({ UserName, Password });
          
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }

          if (!user.isVerified)
            return res.status(400).json({error: 'Email not yet verified.'})
  
          // You may implement token-based authentication here
  
          res.status(200).json({ message: 'Login successful' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });



    app.post('/api/validateEmail', async (req, res) => {

      let  { UserName, VerificationToken } = req.body;
      VerificationToken = bcrypt.hash(VerificationToken, 8)

      try 
      {
          const user = await usersCollection.findOne({UserName, VerificationToken});

          if (!user)
            return res.status(401).json({error: 'Invalid OTP or User. Please try again.'})
          
          const verified = await usersCollection.findOneAndUpdate(
            { isVerified: false },
            { $set: { isVerified: true } }
          );
          res.status(200).json({ message: 'Email Verified'})
        
      }
      catch (error) {
        console.error(error);
        res.status(500),json({ error: 'Internal Server Error'})
      }
    });

    // Edit a username
    app.put('/api/users/edit/:UserId', async (req, res) => {
      const userIdToEdit = parseInt(req.params.UserId);
      const newUsername = req.body.UserName; // Assuming the new username is in the "UserName" field of the request body
    
      try {
        // Check if the user exists
        const userToEdit = await usersCollection.findOneAndUpdate(
          { UserId: userIdToEdit },
          { $set: { UserName: newUsername } }
        );
    
        if (!userToEdit) {
          return res.status(404).json({ error: 'User Not Found' });
        }
    
        res.status(200).json({ message: 'Updated Username' });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    // Delete a user by UserId
    app.delete('/api/users/delete/:UserId', async (req, res) => {
    const userIdToDelete = parseInt(req.params.UserId);
  
    try {
      // Find and delete the user by UserId
      const deletionResult = await usersCollection.deleteOne({ UserId: userIdToDelete });
  
      if (deletionResult.deletedCount === 1) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


////////////////////////Account adding, editing, and deleting////////////////////////////////////
// Add new account
app.post('/api/accounts/add/:UserId', async (req, res) => {
  const { AccountNum, RouteNum, BankName} = req.body;
  try {
    // Check if accounts already added to a user
    const existingAccount = await accCollection.findOne({ AccountNum });

    if (existingAccount) {
      return res.status(400).json({ error: 'Account has already been added' });
    }

    //Check if valid?
    
    const newAccount = {
      AccountNum,
      RouteNum,
      BankName,
      UserIdRef : parseInt(req.params.UserId)
    };

    // Insert account into accounts collection
    await accCollection.insertOne(newAccount);

    // Return a success message
    res.status(201).json({ message: 'Account added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Edit account information
app.put('/api/accounts/edit/:UserId', async (req, res) => {
  const { newAccountNum, newRouteNum, newBankName} = req.body;

  try {
    //make changes one by one (does not work altogether)
    var accountToEdit = await accCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $set: { AccountNum: newAccountNum } },
    );

    accountToEdit = await accCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $set: { RouteNum: newRouteNum } },
    );

    accountToEdit = await accCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $set: { BankName: newBankName } }
    );

    //makes sure changes were made
    if (!accountToEdit) {
      return res.status(404).json({ error: 'Account Not Found in your profile' });
    }

    res.status(200).json({ message: 'Updated Account Information' });
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete Account
app.delete('/api/accounts/delete', async (req, res) => {
  
  const AccountNumtoDelete = req.body.AccountNum;

  try {
    // Find and delete the account by account number
    const deletionResult = await accCollection.deleteOne({ AccountNum : AccountNumtoDelete});

    if (deletionResult.deletedCount === 1) {
      res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
      
    
    }
    catch
    {
      console.error(error);
    }
  }
  
  
  main().catch(console.error);
  