import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

export const queryDB = async (query, params = []) => {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(query, params);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

export default pool;
