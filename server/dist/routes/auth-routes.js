import express from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();
// For demonstration purposes, we'll store users in an in-memory array.
// In production, use a persistent database.
let users = [];
/**
 * POST /auth/signup
 * Expects { username, password } in the request body.
 */
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user already exists.
        const existingUser = users.find((u) => u.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        // Hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        return res.status(201).json({ message: 'User created successfully.' });
    }
    catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Error during signup.' });
    }
});
/**
 * POST /auth/login
 * Expects { username, password } in the request body.
 * Returns a JWT token if credentials are valid.
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user.
        const user = users.find((u) => u.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Compare passwords.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Create and sign the JWT.
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Error during login.' });
    }
});
export default router;
// import { Router, Request, Response } from 'express';
// import { User } from '../models/user.js';  // Import the User model
// import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
// import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing
// // Login function to authenticate a user
// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;  // Extract username and password from request body
//   // Find the user in the database by username
//   const user = await User.findOne({
//     where: { username },
//   });
//   // If user is not found, send an authentication failed response
//   if (!user) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }
//   // Compare the provided password with the stored hashed password
//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   // If password is invalid, send an authentication failed response
//   if (!passwordIsValid) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }
//   // Get the secret key from environment variables
//   const secretKey = process.env.JWT_SECRET_KEY || '';
//   // Generate a JWT token for the authenticated user
//   const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//   return res.json({ token });  // Send the token as a JSON response
// };
// // Create a new router instance
// const router = Router();
// // POST /login - Login a user
// router.post('/login', login);  // Define the login route
// // router.post("/signup", signup);
// export default router;  // Export the router instance
