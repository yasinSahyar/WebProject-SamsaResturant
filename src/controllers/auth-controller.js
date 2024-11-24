import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryDB } from "../utils/db.js";

/**
 * Handles user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const register = async (req, res) => {
    const { full_name, date_of_birth, contact_number, address, email, password } = req.body;

    // Validate input fields
    if (!full_name || !contact_number || !address || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        await queryDB(
            `INSERT INTO users (full_name, date_of_birth, contact_number, address, email, password) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [full_name, date_of_birth, contact_number, address, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

/**
 * Handles user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await queryDB("SELECT * FROM users WHERE email = ?", [email]);
        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user[0].user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, message: "Login successful" });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};
