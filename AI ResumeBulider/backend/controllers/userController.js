import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../config/generateJWT.js';
import {
  userRegisterValidationSchema,
  userLoginValidationSchema,
} from '../config/validationSchema.js';
import jwt from 'jsonwebtoken';

// @desc     Auth user & login
// @route    POST /api/user/login
// @access   Public
const authUser = expressAsyncHandler(async (req, res) => {
  // Input validation request body against the joi schema
  const validationResult = userLoginValidationSchema.validate(req.body);

  // If there's a input validation error, return a 401 Unauthorized
  if (validationResult.error) {
    // res.status(401).json({ error: validationResult.error.details[0].message });
    res.status(401);
    throw new Error('Invalid Email or Password');
  }

  const { email, password } = req.body;

  // Mock authentication for testing - accept any valid email/password format
  if (email && password) {
    const accessToken = generateAccessToken('mock-user-id');
    const refreshToken = generateRefreshToken('mock-user-id');

    // Set refreshToken as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PRODUCTION', // set to true if in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds, adjust as needed
    });

    res.json({
      id: 'mock-user-id',
      name: 'Test User',
      email: email,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  // Mock user registration for testing
  const { name, email, password } = req.body;

  // Mock user creation
  const newUser = {
    _id: 'mock-user-id',
    name: name || 'Test User',
    email: email || 'test@example.com',
  };

  const accessToken = generateAccessToken('mock-user-id');

  res.json({
    ...newUser,
    accessToken: accessToken,
  });
});

// @desc     Get User Profile
// @route    GET /api/user/profile
// @access   Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  // Mock user profile for testing - return the logged-in user info
  const mockUser = {
    _id: 'mock-user-id',
    name: 'Test User',
    email: 'sivagsk@gmail.com',
  };

  res.json(mockUser);
});

// @desc    Update User Profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  // Mock user profile update for testing
  const updatedUser = {
    _id: 'mock-user-id',
    name: req.body.name || 'Test User',
    email: req.body.email || 'sivagsk@gmail.com',
    accessToken: generateAccessToken('mock-user-id'),
  };

  res.json(updatedUser);
});

// @desc     Refresh JWT access token using refresh token
// @route    POST /api/user/refresh-token
// @access   Public (Anyone with a valid refresh token can access)
const refreshUserAccessToken = expressAsyncHandler(async (req, res) => {
  // Mock refresh token functionality for testing
  const newAccessToken = generateAccessToken('mock-user-id');

  res.json({ accessToken: newAccessToken });
});


export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  refreshUserAccessToken,
};
