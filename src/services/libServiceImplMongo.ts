import {LibService} from "./libService.ts";
import {Book, BookGenres, BookStatus} from "../model/Book.ts";
import {BookMongooseModel} from "../model/BookMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";


export class LibServiceImplMongo implements LibService {

    async addBook  (book: Book): Promise<boolean> {
        const isExist = await BookMongooseModel.findById(book.id).exec();
        if(isExist)
            return Promise.resolve(false);
        // const newBook = new BookMongooseModel(book);
        // await newBook.save();
        const temp = await BookMongooseModel.create({
            _id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            status: book.status,
            pickList: book.pickList
        })
        if(!temp) return Promise.resolve(false);
        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]>{
        const result = await BookMongooseModel.find() as Book[]
        return Promise.resolve(result) ;
    }

    getBooksByGenre = async (genre: BookGenres): Promise<Book[]> => {
        const result = await BookMongooseModel.find({genre}).exec() as Book[];
        return Promise.resolve(result) ;
    }

    pickUpBook = async (id: string, reader: string): Promise<void> => {
        const book = await BookMongooseModel.findOne({ _id: id }).exec();
        console.log("BOOK ", book);
        if (!book)
            throw new HttpError(404, `Book with id: ${id} not found`);
        if (book.status !== BookStatus.ON_STOCK)
            throw new HttpError(409, "Book on hand");
        book.status = BookStatus.ON_HAND;
        book.pickList.push({
            reader: reader,
            pickDate: new Date().toDateString(),
            returnDate: null
            })
         book.save();
    }

    removeBook = async (id: string): Promise<Book> => {
        const book = await BookMongooseModel.findByIdAndDelete({ _id: id }).exec() as Book;
        if (!book) throw new HttpError(404, "Book not found.");
        return Promise.resolve(book);
    }

    returnBook = async (id: string): Promise<void> => {
        const book = await BookMongooseModel.findById(id);
        if (!book)
            throw new HttpError(404, `Book with id: ${id} not found`);
        if (book.status !== BookStatus.ON_HAND)
            throw new HttpError(409, "the book is on stock");
        book.status = BookStatus.ON_STOCK;
        const temp = book.pickList[book.pickList.length - 1];
        temp.returnDate = new Date().toDateString();
        book.save();
    }

    getBooksByReader = async (userId: number): Promise<Book[]> => {
        const reader = await ReaderModel.findById(userId).exec();
        if (!reader) throw new HttpError(404, `Reader with id: ${userId} not found`);
        const result = await BookMongooseModel.find({"pickList.reader": reader.userName}) as Book[];
        return result;
    }



//     getBooksByGenreAndStatus = async (genre: BookGenres, status: BookStatus): Promise<Book[]> => {
//         const result = await BookMongooseModel.find({genre, status}).exec() as Book[];
//         return Promise.resolve(result) ;
//     }
 }

export const libServiceMongo = new LibServiceImplMongo();