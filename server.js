// Server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();
const emailValidator = require('deep-email-validator');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const { generateOneTimePass, verifyEmail } = require('./mailing');
require('dotenv/config');
const port = process.env.PORT || 5000; // Heroku set port
const app = express();

const bcrypt = require ("bcrypt");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


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
      const achCollection = db.collection('Achievements');
      const budCollection = db.collection('Budgets');     
      app.listen(port, () => {
        console.log(`Server is running on ${port}`);
      });
  
   // Define a variable for the user counter
let userCounter = 665;

// JWT post
app.get('/posts, authenticateToken', (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});


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

    do {
      // Increment the user counter and use it as UserId
      userCounter += 1;
      check = await usersCollection.findOne({ UserId: userCounter });

    } while (check); //make sure there is no dup userIDs

    const oneTimePass = generateOneTimePass();

    const newUser = {
      UserId: userCounter,
      FirstName,
      LastName,
      Email,
      UserName,
      Password,
      VerificationToken: jwt.sign({ email: Email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }),
      OneTimePass: oneTimePass,
      isVerified: false
    };

    // Insert the user document into the "Users" collection
    await usersCollection.insertOne(newUser);

    const emailToken = newUser.VerificationToken;
    const EmailURL = `https://www.fintech.davidumanzor.com/api/validateEmail/${emailToken}`;
    verifyEmail(Email, EmailURL);

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
  
          // JWT
          const payload = {
            UserName: user.UserName,
            UserId: user.UserId,
            // Any other user-specific data needed??
          };
          const accessToken = generateJWTToken(payload);
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
          res.status(200).json({ message: 'Login successful', accessToken: accessToken, refreshToken: refreshToken});
          

          } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

      function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
      
        if (token == null) return res.sendStatus(401);
      
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
          if (err) return res.sendStatus(403);
      
          req.user = payload;
      
          next();
        });
      }
      
      function generateJWTToken(user) {
        const payload = {
          UserName: user.UserName,
          UserId: user.UserId,
          // Any other user-specific data needed??
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        return accessToken;
      }
      
      app.post('/api/token', (req, res) => {
        const refreshToken = req.cookies.refreshToken;
      
        // Check for the presence of the refresh token
        if (!refreshToken) {
          return res.status(401).json({ error: 'Refresh token not provided' });
        }
      
        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            // Handle verification errors (invalid or expired refresh token)
            return res.status(401).json({ error: 'Invalid refresh token' });
          }
      
          // Access token is expired, generate and send a new access token
          const newAccessToken = generateJWTToken(user);
          res.json({ accessToken: newAccessToken });
        });
      });
      
      app.delete('/api/logout', authenticateToken, (req, res) => {
        res.clearCookie('refreshToken');
        res.sendStatus(204);
      });
      
      app.get('/api/validateEmail/:token', async (req, res) => {

        try {
          const tok = jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET);
          await usersCollection.findOneAndUpdate(
            { VerificationToken: req.params.token },
            { $set: { isVerified: true } }
          );
          res.status(200).json({ message: 'Email Verified' });
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      
        return res.redirect('https://www.fintech.davidumanzor.com/Login');
      });
      

app.get('/api/info/:UserId', authenticateToken, async (req, res) => {
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    var msg = "";
    let dateobj = new Date();

    if(dateobj.getDate() == 1){
      msg = "It's the first of the month, review your budget!";
    }else{
      msg = "The budget does not require immediate updating.";
    }

    const UserAccount = await usersCollection.findOne({ UserId: parseInt(req.params.UserId)});
    const UserBankAccounts = await accCollection.find({ UserIdRef: parseInt(req.params.UserId)}).toArray();
    const Budgets = await budCollection.findOne({ UserIdRef: parseInt(req.params.UserId)});
    // Return a success message
    res.status(201).json({UserAccount, Budgets, UserBankAccounts, msg});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// Edit user information// Edit user information
// Edit user information
app.put('/api/users/edit', authenticateToken, async (req, res) => {
  const newUsername = req.body.UserName;
  const newPassword = req.body.Password;
  const newFirstName = req.body.FirstName;
  const newLastName = req.body.LastName;
  const newEmail = req.body.Email;

  try {
    // Verify that the UserId from the request matches the authenticated user's UserId
    const userIdToEdit = req.user.UserId;

    // Update the user's information
    const updateFields = {};

    if (newUsername) {
      updateFields.UserName = newUsername;
    }

    if (newPassword) {
      updateFields.Password = newPassword;
    }

    if (newFirstName) {
      updateFields.FirstName = newFirstName;
    }

    if (newLastName) {
      updateFields.LastName = newLastName;
    }

    if (newEmail) {
      updateFields.Email = newEmail;
    }

    // Find and update the user in the database
    const updatedUser = await usersCollection.findOneAndUpdate(
      { UserId: userIdToEdit },
      { $set: updateFields },
      { returnOriginal: false }
    );

    if (updatedUser.value === null) {
      return res.status(404).json({ error: 'User Not Found' });
    }

    res.status(200).json({ message: 'Updated User Information' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Delete a user by UserId
app.delete('/api/users/delete', authenticateToken, async (req, res) => {
  const userIdToDelete = req.body.UserId;  // Extract UserId from the request body

  try {
    // Verify that the UserId from the request matches the authenticated user's UserId
    if (userIdToDelete !== req.user.UserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

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


////////////////////////Account adding, get, editing, and deleting////////////////////////////////////
// Add new account
app.post('/api/accounts/add/:UserId', authenticateToken, async (req, res) => {
  const { AccountNum, RouteNum, BankName} = req.body;
  try {

    const user = req.user; // Get the user data from the middleware

    // Check if the UserId in the URL matches the UserId from the token
    if (parseInt(req.params.UserId) !== user.UserId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Check if accounts already added to a user
    const existingAccount = await accCollection.findOne({ AccountNum });

    if (existingAccount) {
      return res.status(400).json({ error: 'Account has already been added' });
    }

    //Add new account
    
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

// Get all accounts for the authenticated user
app.get('/api/accounts', authenticateToken, async (req, res) => {
  try {
    const UserId = req.user.UserId; // Get UserId from the JWT

    // Query your database to fetch all the user's account information based on the UserId
    //Doesn't work because it would be an array - we can workshop this
    const userAccounts = await accCollection.find({ UserIdRef: UserId }).toArray;

    res.status(200).json(userAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/info/:UserId', authenticateToken, async (req, res) => {
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    var msg = "";
    let dateobj = new Date();

    if(dateobj.getDate() == 1){
      msg = "It's the first of the month, review your budget!";
    }else{
      msg = "The budget does not require immediate updating.";
    }

    const UserAccount = await usersCollection.findOne({ UserId: parseInt(req.params.UserId)});
    const UserBankAccounts = await accCollection.find({ UserIdRef: parseInt(req.params.UserId)}).toArray();
    const Budgets = await budCollection.findOne({ UserIdRef: parseInt(req.params.UserId)});
    // Return a success message
    res.status(201).json({UserAccount, Budgets, UserBankAccounts, msg});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// Edit user information// Edit user information
// Edit user information
app.put('/api/users/edit', authenticateToken, async (req, res) => {
  const newUsername = req.body.UserName;
  const newPassword = req.body.Password;
  const newFirstName = req.body.FirstName;
  const newLastName = req.body.LastName;
  const newEmail = req.body.Email;

  try {
    // Verify that the UserId from the request matches the authenticated user's UserId
    const userIdToEdit = req.user.UserId;

    // Update the user's information
    const updateFields = {};

    if (newUsername) {
      updateFields.UserName = newUsername;
    }

    if (newPassword) {
      updateFields.Password = newPassword;
    }

    if (newFirstName) {
      updateFields.FirstName = newFirstName;
    }

    if (newLastName) {
      updateFields.LastName = newLastName;
    }

    if (newEmail) {
      updateFields.Email = newEmail;
    }

    // Find and update the user in the database
    const updatedUser = await usersCollection.findOneAndUpdate(
      { UserId: userIdToEdit },
      { $set: updateFields },
      { returnOriginal: false }
    );

    if (updatedUser.value === null) {
      return res.status(404).json({ error: 'User Not Found' });
    }

    res.status(200).json({ message: 'Updated User Information' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Delete a user by UserId
app.delete('/api/users/delete', authenticateToken, async (req, res) => {
  const userIdToDelete = req.body.UserId;  // Extract UserId from the request body

  try {
    // Verify that the UserId from the request matches the authenticated user's UserId
    if (userIdToDelete !== req.user.UserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

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


////////////////////////Account adding, get, editing, and deleting////////////////////////////////////
// Add new account
app.post('/api/accounts/add/:UserId', authenticateToken, async (req, res) => {
  const { AccountNum, RouteNum, BankName} = req.body;
  try {

    const user = req.user; // Get the user data from the middleware

    // Check if the UserId in the URL matches the UserId from the token
    if (parseInt(req.params.UserId) !== user.UserId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Check if accounts already added to a user
    const existingAccount = await accCollection.findOne({ AccountNum });

    if (existingAccount) {
      return res.status(400).json({ error: 'Account has already been added' });
    }

    //Add new account
    
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

// Get all accounts for the authenticated user
app.get('/api/accounts', authenticateToken, async (req, res) => {
  try {
    const UserId = req.user.UserId; // Get UserId from the JWT

    // Query your database to fetch all the user's account information based on the UserId
    //Doesn't work because it would be an array - we can workshop this
    const userAccounts = await accCollection.find({ UserIdRef: UserId }).toArray;

    res.status(200).json(userAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific account
app.get('/api/account', authenticateToken, async (req, res) => {
  try {
    const UserId = req.user.UserId; // Get UserId from the JWT
    const AccountNum = req.body.AccountNum; // Get the AccountNum from the request body

    // Query your database to fetch the specific account information based on the UserId and AccountNum
    const specificAccount = await accCollection.findOne({ AccountNum: AccountNum });

    if (!specificAccount) {
      return res.status(404).json({ error: 'Account Not Found' });
    }

    res.status(200).json(specificAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Edit Account
app.put('/api/accounts/edit/:UserId', authenticateToken, async (req, res) => {
  const { oldAccountNum, newAccountNum, newRouteNum, newBankName } = req.body;
  const userId = parseInt(req.params.UserId);

  try {
    // Verify that the UserId from the request matches the authenticated user's UserId
    if (userId !== req.user.UserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const filter = { UserIdRef: userId, AccountNum: oldAccountNum };
    const updateFields = {};

    if (newAccountNum) {
      updateFields.AccountNum = newAccountNum;
    }

    if (newRouteNum) {
      updateFields.RouteNum = newRouteNum;
    }

    if (newBankName) {
      updateFields.BankName = newBankName;
    }

    const updateResult = await accCollection.updateOne(filter, { $set: updateFields });

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: 'Account Not Found in your profile' });
    }

    if (updateResult.modifiedCount > 0) {
      return res.status(200).json({ message: 'Updated Account Information' });
    }

    // No account was updated
    return res.status(400).json({ error: 'No changes were made to the account' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Account
app.delete('/api/accounts/delete', authenticateToken, async (req, res) => {
  const AccountNumtoDelete = req.body.AccountNum;

  if (!AccountNumtoDelete) {
    return res.status(400).json({ error: 'Account number to delete is required' });
  }

  try {
    const userId = req.user.UserId;

    // Find and delete the account by account number and the user's UserId
    const deletionResult = await accCollection.deleteOne({ AccountNum: AccountNumtoDelete, UserIdRef: userId });

    if (deletionResult.deletedCount === 1) {
      return res.status(200).json({ message: 'Account deleted successfully' });
    }

    return res.status(404).json({ error: 'Account not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

///////////////////////////Budget Endpoints//////////////////////////////
//Add new budget
app.post('/api/budgets/add/:UserId', authenticateToken, async (req, res) => {
  try {
    //If it is first of the month then call this to create a new budget.
    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    const existingBudget = await budCollection.findOneAndDelete({UserIdRef : parseInt(req.params.UserId)})

    const {MonthlyIncome, GoalDescription, GoalAmt, SavedAmt} = req.body;

    const UserIdRef = parseInt(req.params.UserId);
    
    const MonthlyExpenses = {
        rent: req.body.rent ,
        utilities: req.body.utilities,
        groceries: req.body.groceries,
        insurance: req.body.insurance,
        phone: req.body.phone,
        car: req.body.car,
        gas: req.body.gas,
        fun: req.body.fun,
        goal: req.body.goal,
    };

    var MonthlyExpensesAmt = 0;
    for (x in MonthlyExpenses) {
      MonthlyExpensesAmt += MonthlyExpenses[x];
    }
    
    var Transactions = {
      
    };
    var TransactionsAmt = 0;
    for (x in Transactions) {
      TransactionsAmt += Transactions[x];
    }

    var Complete = false;
    if(GoalAmt == SavedAmt){
      Complete = true;
    }

    const newBudget = {
      UserIdRef,
      MonthlyIncome,
      MonthlyExpenses,
      MonthlyExpensesAmt,
      Transactions,
      TransactionsAmt,
      GoalDescription,
      GoalAmt,
      SavedAmt,
      Complete
    }

    // Insert budget into budgets collection
    await budCollection.insertOne(newBudget);

    // Return a success message
    res.status(201).json({ message: 'Budget added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Edit budget
app.put('/api/budgets/edit/:UserId', authenticateToken, async (req, res) => {
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    //If it is first of the month then call this to create a new budget.

    const {MonthlyIncome, GoalDescription, GoalAmt, SavedAmt} = req.body;

    const UserIdRef = parseInt(req.params.UserId);
    
    const MonthlyExpenses = {
        rent: req.body.rent ,
        utilities: req.body.utilities,
        groceries: req.body.groceries,
        insurance: req.body.insurance,
        phone: req.body.phone,
        car: req.body.car,
        gas: req.body.gas,
        fun: req.body.fun,
        goal: req.body.goal,
    };

    var MonthlyExpensesAmt = 0;
    for (x in MonthlyExpenses) {
      MonthlyExpensesAmt += MonthlyExpenses[x];
    }

    var Complete = false;
    if(GoalAmt == SavedAmt){
      Complete = true;
    }

    // Update Budget
    var editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { MonthlyExpenses : MonthlyExpenses }}
    );

    editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { MonthlyIncome : MonthlyIncome }}
    );

    editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { GoalDescription : GoalDescription }}
    );

    editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { GoalAmt : GoalAmt }}
    );
    
    editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { SavedAmt : SavedAmt }}
    );

    editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { MonthlyExpensesAmt : MonthlyExpensesAmt }}
    );

    editor = await budCollection.findOneAndUpdate(
      { UserIdRef : UserIdRef },
      { $set: { Complete : Complete }}
    );

    // Return a success message
    res.status(201).json({ message: 'Budget edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/budgets/get/:UserId', authenticateToken, async (req, res) => {
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    const budgetGot = await budCollection.findOne({UserIdRef : parseInt(req.params.UserId)});

    // Return a success message
    res.status(201).json({ message: JSON.stringify(budgetGot) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/////////////////Transactions//////////////////////////////////////
// add transaction + update budget
app.post('/api/budgets/transactions/:UserId', authenticateToken, async (req, res) => {
  
  var TransactionID = Math.floor(Math.random() * 999) + 1;
  var Transactions = {
    transactionID : TransactionID,
    transactionAmt : req.body.transactionAmt,
    transactionCategory : req.body.transactionCategory
  };
  var TransactionsAmt = 0;
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    var budgetToEdit = await budCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $push: { Transactions: {Transactions} } },
    );

    var transactionGrabber = await budCollection.findOne(
      { UserIdRef: parseInt(req.params.UserId)}
    );

    for (x in transactionGrabber.Transactions) {
      TransactionsAmt += transactionGrabber.Transactions[x].Transactions.transactionAmt;
    }  

    budgetToEdit = await budCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $set: { TransactionsAmt: TransactionsAmt} },
    );

    res.status(200).json({ message: 'Updated budget Information' });
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete transactions
app.delete('/api/budgets/transactions/delete/:UserId', authenticateToken, async (req, res) => {
  
  var TransactionID = req.body.transactionID;
  var TransactionsAmt = 0;
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    var transactionGrabber = await budCollection.findOne(
      { UserIdRef: parseInt(req.params.UserId)}
    );
    
    for(x in transactionGrabber.Transactions){
      if(transactionGrabber.Transactions[x].Transactions.transactionID == TransactionID){
        var transactionDeleter = budCollection.findOneAndUpdate(
          { UserIdRef: parseInt(req.params.UserId)},
          { $pull : {Transactions : transactionGrabber.Transactions[x]}}
        );
      }
    }

    transactionGrabber = await budCollection.findOne(
      { UserIdRef: parseInt(req.params.UserId)}
    );

    //recalculate the total transaction amt
    for (x in transactionGrabber.Transactions) {
      TransactionsAmt += transactionGrabber.Transactions[x].Transactions.transactionAmt;
    }  
    
    //set new amt
    transactionGrabber = await budCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $set: { TransactionsAmt: TransactionsAmt} },
    );

    res.status(200).json({ message: 'Successful deletion'});
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//edit transactions
app.put('/api/budgets/transactions/edit/:UserId', authenticateToken, async (req, res) => {
  
  var Transactions = {
    transactionID : req.body.transactionID,
    transactionAmt : req.body.transactionAmt,
    transactionCategory : req.body.transactionCategory
  };

  var TransactionsAmt = 0;
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    var transactionGrabber = await budCollection.findOne(
      { UserIdRef: parseInt(req.params.UserId)}
    );
    
    for(x in transactionGrabber.Transactions){
      if(transactionGrabber.Transactions[x].Transactions.transactionID == req.body.transactionID){
        var transactionDeleter = budCollection.findOneAndUpdate(
          { UserIdRef: parseInt(req.params.UserId)},
          { $pull : {Transactions : transactionGrabber.Transactions[x]}}
        );
      }
    }

    var Transactions = {
      transactionID : Math.floor(Math.random() * 999) + 1,
      transactionAmt : req.body.transactionAmt,
      transactionCategory : req.body.transactionCategory
    };

    transactionUpdater = await budCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $push: { Transactions: {Transactions} } },
    );

    transactionGrabber = await budCollection.findOne(
      { UserIdRef: parseInt(req.params.UserId)}
    );

    //recalculate the total transaction amt
    for (x in transactionGrabber.Transactions) {
      TransactionsAmt += transactionGrabber.Transactions[x].Transactions.transactionAmt;
    }  
    
    //set new amt
    transactionGrabber = await budCollection.findOneAndUpdate(
      { UserIdRef: parseInt(req.params.UserId)},
      { $set: { TransactionsAmt: TransactionsAmt} },
    );

    res.status(200).json({ message: 'Successful budget update'});
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get transaction
app.get('/api/budgets/transactions/get/:UserId', authenticateToken, async (req, res) => {
  
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    var transactionGrabber = await budCollection.findOne(
      { UserIdRef: parseInt(req.params.UserId)}
    );


    res.status(200).json(transactionGrabber.Transactions);
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Achievement Endpoints
app.post('/api/achievements/add/:UserId', authenticateToken, async (req, res) => {
  const achievementToAdd = req.body.achievementToAdd;

  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    // Add achievement object to user
    const achievementAdded = await achCollection.findOne({ AchievementId: achievementToAdd});
    const userToEdit = await usersCollection.findOneAndUpdate(
      { UserId: parseInt(req.params.UserId)},
      { $push: { AchievementList : {achievementAdded}} }
    );

    // Return a success message
    res.status(201).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get achievements
app.get('/api/achievements/get/:UserId', authenticateToken, async (req, res) => {
  try {

    if(parseInt(req.params.UserId) != req.user.UserId){
      return res.status(403).json({ message: 'Access Denied' });
    }

    const achievement = await usersCollection.findOne(
      { UserId: parseInt(req.params.UserId)});

    // Return a success message
    res.status(201).json(achievement.AchievementList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 
    
    }
    catch
    {
      //console.error(error);
    }
  }
  
  
  main().catch(console.error);

