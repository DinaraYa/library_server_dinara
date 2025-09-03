import mysql, {Pool} from 'mysql2/promise';
import dotenv from 'dotenv';
import appConf from "../../appConfig/app-config.json" with {type: "json"}


export interface AppConfig {
    port: number;
    skipRoutes:string[];
    pathRoles:Record<string, string[]>;
    checkIdRoutes:string[],
    pool:Pool,
    mongoUri:string,
    jwt:{
        secret:string,
        exp:string | number

    },
    "timeWindow": number,
    "userLimit": number
}

//export const PORT = 3117;
// export const MONGO_URI = "mongodb+srv://tylemisovadinara:ESjivJWz1TXwYI3T@cluster0.nndz5yc.mongodb.net/first_collection?retryWrites=true&w=majority&appName=Cluster0"
dotenv.config()


export const configuration: AppConfig ={
    ...appConf,
    pool: mysql.createPool({
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }),
    mongoUri:process.env.MONGO_URI || "dev db address",
    jwt:{
        secret: process.env.JWT_SECRET || "super-secret",
        exp: process.env.JWT_EXP || "1h"
    }
}



// ================ mySQL CONNECTION =====================

// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: +process.env.DB_PORT!,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD
// })

// const connection = await pool.getConnection();

// export const SKIP_ROUTES = [
//     "POST/accounts",
//     "GET/api/books"
// ]

/*
USER: getAccountById(?), changePassword(?), updateAccount(?)
ADMIN: getAccountById,  updateAccount
SUPERVISOR: deleteAccount, changeRoles
 */


// export const PATH_ROUTES = {
//     "GET/accounts/reader_id" : [Roles.USER, Roles.ADMIN],
//     "PATCH/accounts/password" : [Roles.USER],
//     "PATCH/accounts": [Roles.USER, Roles.ADMIN],
//     "DELETE/accounts": [Roles.SUPERVISOR],
//     "PUT/accounts/roles": [Roles.SUPERVISOR],
//
//     "GET/api/books": [Roles.USER],
//     "GET/api/books/genre": [Roles.USER],
//     "POST/api/books": [Roles.ADMIN],
//     "DELETE/api/books/remove": [Roles.ADMIN],
//     "PATCH/api/books/pickup": [Roles.LIBRARIAN],
//     "PATCH/api/books/return": [Roles.LIBRARIAN],
//     "GET/api/books/reader_list": [Roles.LIBRARIAN, Roles.ADMIN],
// }

// export const CHECK_ID_ROUTES = [
//     "GET/accounts/reader_id", "PATCH/accounts/password", "PATCH/accounts"
// ]