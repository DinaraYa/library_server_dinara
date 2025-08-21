import {Request, response, Response} from "express";
import {Reader, ReaderDto} from "../model/Reader.js";
import {convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/AccountServiceImplMongo.js";



export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.addAccount(reader)
    res.status(201).send("Account created")
}

export const getAccount= async (req: Request, res: Response) => {
   const id = req.params.id;
    console.log("READER_ID " + id);
   const reader = await accountServiceMongo.getAccount(id);
    console.log("READER controller " + reader);
   res.status(200).json(reader);
}
export const removeAccount= async (req: Request, res: Response) => {
    const id = req.params.id
    console.log("READER_ID " + id);
    const reader = await accountServiceMongo.removeAccount(id);
    console.log("READER controller " + reader);
    res.status(200).json(reader);
    response.send("Account deleted")
}
export const changePassword= async (req: Request, res: Response) => {
    console.log("headers:", req.headers);
    console.log("raw body:", req.body);
    const body = req.body;
    console.log("BODY controller " + body)
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.changePassword(reader);
    res.status(200).send("Password updated");
}