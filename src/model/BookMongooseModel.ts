import * as mongoose from "mongoose";
import {BookGenres, BookStatus} from "./Book.js";
import { v4 as uuidv4 } from 'uuid';


export const PickListSchema = new mongoose.Schema({
        reader: {type: String, required: true},
        pickDate: {type: String, required: true},
        returnDate: {type: String, default: null},
}, {
    _id: false,
});

export const BookMongooseSchema = new mongoose.Schema({
    //id: {type: String, required: true}, // в данном случае будут удаляться id, которые были созданы при помощи Mongoose
    // _id: type: String,  length(36), required: true}
    //_id: {type: 'UUID', default:() => uuidv4()},
    _id: {type: String, default: () => uuidv4()}, // id созданные uuidv4
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true, enum: Object.values(BookGenres)},
    status: {type: String, required: true, enum: Object.values(BookStatus)},
    pickList: {type: [PickListSchema], default: []}
})


export const BookMongooseModel = mongoose.model('Book', BookMongooseSchema, 'book_collection')