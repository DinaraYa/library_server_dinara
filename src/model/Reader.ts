import {Roles} from "../utils/libTypes.js";

export type ReaderDto = {
    id: number,
    role: string,
    userName: string,
    email: string,
    password: string,
    birthdate: string
}

export type Reader = {
    //_id?: string,
    _id: number,
    roles: Roles[],
    userName: string,
    email: string,
    birthdate: string,
    passHash: string
}