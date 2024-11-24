import express from 'express';
import bcrypt from 'bcrypt';
import { queryDB } from '../utils/db.js'; // Replace with your actual DB query function

const router = express.Router();

router.post('/register', async (req, res) => {
    const { full_name, date_of_birth, contact_number, address, email, password } = req.body;

    try {
        // Check if the email is already in use
        const existingUsers = await queryDB('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Email is already registered. Please use a different email." });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the users table
        await queryDB(
            `INSERT INTO users (full_name, date_of_birth, contact_number, address, email, password)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [full_name, date_of_birth, contact_number, address, email, hashedPassword]
        );

        // Respond with success message
        res.status(201).json({ message: "Registration successful! You can now log in." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "An error occurred while trying to register." });
    }
});

export default router;
