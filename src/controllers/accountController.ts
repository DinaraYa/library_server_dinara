import {Request, response, Response} from "express";
import {Reader, ReaderDto} from "../model/Reader.js";
import {checkReaderId, convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/AccountServiceImplMongo.js";




export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.addAccount(reader)
    res.status(201).send("Account created")
}

export const getAccount= async (req: Request, res: Response) => {
   const id = req.query.id;
    console.log("READER_ID " + id);
   const reader = await accountServiceMongo.getAccount(Number(id));
    console.log("READER controller " + reader);
   res.status(200).json(reader);
}
export const removeAccount= async (req: Request, res: Response) => {
    const id = req.query.id
    console.log("READER_ID " + id);
    const reader = await accountServiceMongo.removeAccount(Number(id));
    console.log("READER controller " + reader);
    res.status(200).json(reader);
    response.send("Account deleted")
}

export const changePassword= async (req: Request, res: Response) => {
    const {id, oldPassword, newPassword} = req.body;
    console.log("Controller " + id);
    console.log(" oldPass "+oldPassword);
    console.log(" newPass " + newPassword)
    const _id = checkReaderId(id);
    console.log("Controller " + _id );
    await accountServiceMongo.changePassword(id, oldPassword, newPassword);
    res.send("Password changed");
}

export const updateProfile = async (req: Request, res: Response) => {
    const {id, userName, email, birthdate} = req.body;
    const profile = await accountServiceMongo.updateProfile(id,userName, email, birthdate);
    res.status(200).json(profile);
}