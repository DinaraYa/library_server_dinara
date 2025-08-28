import {Request, Response} from "express";
import {Book, BookDto, BookGenres} from "../model/Book.ts";
import {HttpError} from "../errorHandler/HttpError.ts";
import {convertBookDtoToBook, getGenre, getStatus} from "../utils/tools.js";
//import {LibServiceSQL as service} from "../services/libServiceImplSQL.js";
//import {libServiceEmbedded as service} from "../services/libServiceImplEmbedded.js";
import {libServiceMongo as service} from "../services/libServiceImplMongo.js";
import {accountServiceMongo} from "../services/AccountServiceImplMongo.js";


// export const getBooksByGenreAndStatus = async (req: Request, res: Response) => { //don't work
//     const {genre, status} = req.params;
//     const genre_upd = getGenre(genre as string);
//     const status_upd = getStatus(status as string);
//     const result: Book [] = await service.getBooksByGenreAndStatus(genre_upd,status_upd);
//     res.status(200).json(result);
// }
export const getAllBooks = async (req: Request, res: Response) => {
    const result = await service.getAllBooks();
    res.json(result);
}

export const addBook = async (req: Request, res: Response) => {
    const dto = req.body as BookDto;
    const book: Book = convertBookDtoToBook(dto);
    const result = await service.addBook(book);
    if (result)
        res.status(201).send("Book added successfully");
    else throw new HttpError(409, "Book not added. ID conflict");
}

export const removeBook = async (req: Request, res: Response) => {
    const id = req.query.id;
    const book = await service.removeBook(id as string);
    res.status(200).json(book);
}

export const getBooksByGenre = async (req: Request, res: Response) => {
    const {genre} = req.query;
    const genre_upd = getGenre(genre as string);
    const result = await service.getBooksByGenre(genre_upd);
    res.status(200).json(result);
}


export const pickUpBook = async (req: Request, res: Response) => {
    const bookId = req.query.id;
    const reader = req.query.reader;
    const account = await accountServiceMongo.getAccountByName(reader as string);
        await service.pickUpBook(bookId as string, reader as string);
        res.status(200).send("Book picked up");
}

export const returnBook = async (req: Request, res: Response) => {
    const id = req.query.id;
    await service.returnBook(id as string);
    res.status(200).send("Book returned");
}


export const getBooksByReader = async (req: Request, res: Response) => {
    const readerId = req.query.id;
    const result = await service.getBooksByReader(Number(readerId));
    res.status(200).json(result);
}