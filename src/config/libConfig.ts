import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import {Roles} from "../utils/libTypes.js";

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

// const connection = await pool.getConnection();

export const SKIP_ROUTES = [
    "POST/accounts",
    "GET/api/books"
]

/*
USER: getAccountById(?), changePassword(?), updateAccount(?)
ADMIN: getAccountById,  updateAccount
SUPERVISOR: deleteAccount, changeRoles
 */


export const PATH_ROUTES = {
    "GET/accounts/reader_id" : [Roles.USER, Roles.ADMIN],
    "PATCH/accounts/password" : [Roles.USER],
    "PATCH/accounts": [Roles.USER, Roles.ADMIN],
    "DELETE/accounts": [Roles.SUPERVISOR],
    "PUT/accounts/roles": [Roles.SUPERVISOR]
}

export const CHECK_ID_ROUTES = [
    "GET/accounts/reader_id", "PATCH/accounts/password", "PATCH/accounts"
]