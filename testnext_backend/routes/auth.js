const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("Auth route is working!");
});

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password during registration:", hashedPassword); // Log the hashed password for debugging

        // Create the new user with the hashed password
        const user = await User.create({ username, password: hashedPassword });

        // Respond with the user data (except password) for security
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    try {
        // Fetch user from the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Log the user’s stored hashed password for debugging
        console.log("Stored hashed password in database:", user.password);

        // Compare entered password with hashed password from database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch); // Log the result of password comparison

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Create a JWT token for the user if password matches
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log('Login successful:', { token });

        // Respond with the JWT token
        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
