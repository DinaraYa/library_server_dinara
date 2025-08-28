import * as mongoose from "mongoose";
import {Reader} from "./Reader.js";
import {  Document } from "mongoose";
import {Roles} from "../utils/libTypes.js";


type ReaderDocument = Reader & Document;

const readerMongooseSchema = new mongoose.Schema<ReaderDocument>({
    _id: {type: Number, length: 9, required: true},
    roles: {type: [String], enum: Roles, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    birthdate: { type: String, required: true },
    passHash: { type: String, required: true }
});

export const ReaderModel = mongoose.model<ReaderDocument>('Reader', readerMongooseSchema ,"reader_collection");



