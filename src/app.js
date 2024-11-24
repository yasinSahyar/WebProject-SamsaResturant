import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth-routes.js";
import reservationRoutes from "./routes/reservation-routes.js"; 
import loginRoutes from './routes/login-routes.js';
import registrationRoutes from './routes/registration-routes.js';
import forgotPasswordRoutes from './routes/forgot-password-routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(path.resolve(), "public")));

// Serve the images folder (if kept outside public)
app.use('/images', express.static(path.join(path.resolve(), 'images')));

// Routes
app.use("/auth", authRoutes); // For login, registration
app.use("/reservation", reservationRoutes); // For reservation-related endpoints
app.use("/login", loginRoutes);
app.use("/register", registrationRoutes);
app.use('/auth', forgotPasswordRoutes);
// Root route for the frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public", "index.html"));
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
