// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv/config');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const url =
process.env.DB_CONNECTION;

const client = new MongoClient(url);

async function main() {
    try {
      await client.connect();
        
      console.log('Connected to MongoDB');
      const db = client.db('FinanceBuddy');
      const usersCollection = db.collection('Users');
  
      // Define Express.js app and routes
      const app = express();
      app.use(bodyParser.json());
  
   // Define a variable for the user counter
let userCounter = 665;

// Register a new user
app.post('/api/register', async (req, res) => {
  const { FirstName, LastName, UserName, Password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await usersCollection.findOne({ UserName });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Increment the user counter and use it as UserId
    userCounter += 1;

    const newUser = {
      FirstName,
      LastName,
      UserId: userCounter,
      UserName,
      Password,
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

  
      // Authenticate a user
      app.post('/api/login', async (req, res) => {
        const { UserName, Password } = req.body;
  
        try {
          // Check if the user exists
          const user = await usersCollection.findOne({ UserName, Password });
          
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
  
          // You may implement token-based authentication here
  
          res.status(200).json({ message: 'Login successful' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });


    // Edit a username
    app.get('/api/editusers/:UserId', async (req, res) => {

      const userIdToEdit = parseInt(req.params.UserId);
      const newUsername = parseInt(req.params.UserName);
      try {
          // Check if the user exists
        const usertoEdit = await usersCollection.findOneAndUpdate({ UserId: usertoEdit}, { UserName: newUsername })
                
        if (!user) {
          return res.status(401).json({ error: 'User Not Found' });
        }
        
        
        
        res.status(200).json({ message: 'Updated Username' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    // Delete a user by UserId
    app.delete('/api/users/:UserId', async (req, res) => {
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
  
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } finally {
      // The MongoDB client will be closed when the app is terminated
    }
  }
  
  main().catch(console.error);
  