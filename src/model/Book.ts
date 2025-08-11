import e from "express";
import * as mongoose from "mongoose";

export type BookDto = {
    title: string,
    author: string,
    genre: string,
    quantity?: number,
}



export type Book = {
    id: string,
    title: string,
    author: string,
    genre: BookGenres,
    status: BookStatus,
    pickList: PickRecord []
}


export enum BookGenres {
    "SCI_FI" = "sci-fi",
    "ADVENTURE" = "adventure",
    "FANTASY" = "fantasy",
    "ROMANTIC" = "romantic",
    "CLASSIC" = "classic",
    "DYSTOPIA" = "dystopia",
    "DETECTIVE" = "detective"
}

export enum BookStatus {
    "ON_STOCK" = "on stock",
    "ON_HAND" = "on_hand",
    "REMOVED" = "removed"
}

export type PickRecord = {
    reader: string,
    pickDate: string,
    returnDate: string | null
}


export const BookMongooseSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true, enum: Object.values(BookGenres)},
    status: {type: String, required: true, enum: Object.values(BookStatus)},
    pickList: [{
        reader: {type: String, required: false},
        pickDate: {type: String, required: false},
        returnDate: {type: String, required: false},
    }]
})

export const BookDbModel = mongoose.model('Book', BookMongooseSchema, 'book_collection')