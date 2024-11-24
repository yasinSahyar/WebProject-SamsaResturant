import { queryDB } from '../utils/db.js';

export const createReservation = async (data) => {
    const { name, email, date, time, guests, message } = data;
    return queryDB(
        "INSERT INTO reservations (name, email, date, time, guests, message) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, date, time, guests, message]
    );
};

export const getAllReservations = async () => {
    return queryDB("SELECT * FROM reservations");
};
