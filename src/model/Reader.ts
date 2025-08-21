import { Types } from "mongoose";


export type ReaderDto = {
    // id: number,
    userName: string,
    email: string,
    password: string,
    birthdate: string
}

export type Reader = {
    _id: string,
    userName: string,
    email: string,
    birthdate: string,
    passHash: string
}