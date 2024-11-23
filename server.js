import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Secret Key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Register Route
app.post("/register", async (req, res) => {
    const { full_name, date_of_birth, contact_number, address, email, password } = req.body;

    if (!full_name || !contact_number || !address || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (full_name, date_of_birth, contact_number, address, email, password) VALUES (?, ?, ?, ?, ?, ?)",
            [full_name, date_of_birth, contact_number, address, email, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!user.length) return res.status(400).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ user_id: user[0].user_id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!user.length) return res.status(400).json({ message: "User not found" });

        // Placeholder for email logic
        res.json({ message: "Password reset email sent (mock implementation)" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error handling password reset" });
    }
});

// Reservation Route
app.post("/reservation", async (req, res) => {
    const { name, email, date, time, guests, message } = req.body;

    if (!name || !email || !date || !time || !guests) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await pool.query(
            "INSERT INTO reservations (name, email, date, time, guests, message) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, date, time, guests, message]
        );
        res.status(201).json({ message: "Reservation successfully created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating reservation" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));