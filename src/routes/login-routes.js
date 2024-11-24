import express from 'express';
import bcrypt from 'bcrypt';
import { queryDB } from '../utils/db.js'; // Replace with your actual DB query function

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await queryDB('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // User authenticated successfully
        res.status(200).json({
            user_id: user.user_id,
            full_name: user.full_name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "An error occurred while trying to log in." });
    }
});

export default router;
