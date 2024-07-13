const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
  // Add a return statement to prevent further execution
  return;
};


// Register User Api
router.post('/register', async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email is already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPassword, confirmPassword: hashedPassword });
    await user.save();

    const token = jwt.sign({ user: user.name }, process.env.SECRET_KEY);

    res.json({
      success: true,
      user: user.name,
      token: token,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});


// Login User Api

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        error: 'Password not matched',
      });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);

    res.json({
      success: true,
      name: existingUser.name,
      // email: existingUser.email,
      token: token,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;








// Q. Explain this part     const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);

// jwt.sign: This function is from the jsonwebtoken library, and it is used to generate a JSON Web Token (JWT).
// { userId: existingUser._id }: This is the payload of the JWT. It typically contains information about the user or any data that needs to be transmitted securely. In this case, it includes the userId field with the value of the user's _id (user ID) from the existingUser object retrieved from the database during login.
// process.env.SECRET_KEY: This is the secret key used to sign the JWT. It's essential to keep this secret and never expose it to the client.
// The jwt.sign function combines the payload with the secret key to create a unique token. This token is then sent back to the client as part of the login response. The client can include this token in subsequent requests to authenticate and authorize the user.



// Q. is it compulasay to require id to jwt to generate token?
// Ans- No, it is not compulsory to include the user's ID (userId) in a JWT. The choice of what to include in the JWT payload depends on the specific requirements and design decisions of your application.
// A JWT payload typically contains claims or information about the user or the entity it represents. Common claims include user ID, username, role, expiration time, etc. Including the user's ID can be useful for identifying the user during subsequent requests.