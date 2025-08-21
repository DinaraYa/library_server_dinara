import * as mongoose from "mongoose";
import {Reader} from "./Reader.js";
import {  Document } from "mongoose";


type ReaderDocument = Reader & Document;
const readerMongooseSchema = new mongoose.Schema<ReaderDocument>({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    birthdate: { type: String, required: true },
    passHash: { type: String, required: true }
});

export const ReaderModel = mongoose.model<ReaderDocument>('Reader', readerMongooseSchema ,"reader_collection");



