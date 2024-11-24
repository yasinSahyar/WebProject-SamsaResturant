import { queryDB } from '../utils/db.js';

export const createUser = async (data) => {
    const { full_name, date_of_birth, contact_number, address, email, password } = data;
    return queryDB(
        "INSERT INTO users (full_name, date_of_birth, contact_number, address, email, password) VALUES (?, ?, ?, ?, ?, ?)",
        [full_name, date_of_birth, contact_number, address, email, password]
    );
};

export const getUserByEmail = async (email) => {
    return queryDB("SELECT * FROM users WHERE email = ?", [email]);
};
