import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

export const PORT = 3117;
export const MONGO_URI = "mongodb+srv://tylemisovadinara:ESjivJWz1TXwYI3T@cluster0.nndz5yc.mongodb.net/first_collection?retryWrites=true&w=majority&appName=Cluster0"
dotenv.config()

// ================ mySQL CONNECTION =====================

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

const connection = await pool.getConnection();