// forgot-password-routes.js
import express from 'express';
import { queryDB } from '../utils/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log("Incoming forgot password request:", req.body); // Log incoming data to help debug

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        const users = await queryDB('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: "No user found with this email address." });
        }

        const user = users[0];
        const resetToken = uuidv4();
        const expirationTime = new Date(Date.now() + 3600000); // 1 hour from now

        await queryDB(
            `INSERT INTO password_reset_requests (user_id, reset_token, request_time, expiration_time)
             VALUES (?, ?, CURRENT_TIMESTAMP, ?)`,
            [user.user_id, resetToken, expirationTime]
        );

        // Here you'd typically send an email with the reset link, but for now, we just log it.
        const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;
        console.log("Password reset link (send this to user):", resetLink);

        // Send success response
        res.status(200).json({ message: "A reset link has been sent to your email address." });
    } catch (error) {
        console.error("Error processing forgot password request:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});

export default router;
