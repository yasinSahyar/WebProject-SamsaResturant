import express from "express";
import { createReservation } from "../controllers/reservation-controller.js";

const router = express.Router();

// Define the POST /reservation route
router.post("/", createReservation);

export default router;
