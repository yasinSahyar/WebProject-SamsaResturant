import { queryDB } from "../utils/db.js";

export const createReservation = async (req, res) => {
    const {
        user_id,
        name,
        email,
        adults,
        children,
        reservation_date,
        reservation_time,
        special_request
    } = req.body;

    // Calculate guests if not provided
    const guests = parseInt(adults, 10) + (children ? parseInt(children, 10) : 0);

    // Validate input fields
    if ((!user_id && (!name || !email)) || !adults || !reservation_date || !reservation_time) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Ensure all required fields are numbers where applicable
    if (isNaN(adults) || adults <= 0) {
        return res.status(400).json({ message: "Number of adults must be a valid positive number." });
    }

    if (children && isNaN(children)) {
        return res.status(400).json({ message: "Number of children must be a valid number." });
    }

    try {
        console.log("Incoming reservation request:", req.body); // Log incoming data for debugging

        // Insert reservation into the database
        await queryDB(
            `INSERT INTO reservations (user_id, name, email, adults, children, reservation_date, reservation_time, special_request, guests)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, name, email, adults, children, reservation_date, reservation_time, special_request, guests]
        );

        res.status(201).json({ message: "Reservation successful" });
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ message: "Error creating reservation" });
    }
};
