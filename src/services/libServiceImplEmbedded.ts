import {LibService} from "./libService.ts";
import {Book, BookDbModel, BookGenres, BookStatus} from "../model/Book.ts";
import {HttpError} from "../errorHandler/HttpError.js";


export class LibServiceImplEmbedded implements LibService {
    private books: Book[] = [];

    addBook = async (data: Book): Promise<boolean> => {
        const BookToAdd = new BookDbModel(data);
        await BookToAdd.save();
        return true;
    }

    getAllBooks = async (): Promise<Book[]> => {
        return BookDbModel.find();
    }

    getBooksByGenre = async (genre: BookGenres): Promise<Book[]> => {
        const books: Book[] = await BookDbModel.find({genre});
        if (books.length === 0) throw new HttpError(404, "Books not found.");
        return books;
    }

    pickUpBook = async (id: string, reader: string): Promise<void> => {
        const book = await BookDbModel.findById({id});
        console.log(book + id);
        // @ts-ignore
        if (!book) throw new HttpError(404, "Books not found.");
        if(book.status !== BookStatus.ON_STOCK) throw new HttpError(409, "No this book on stock");
        // @ts-ignore
        book.status = BookStatus.ON_HAND;
        // @ts-ignore
        book.pickList.push({
            reader: reader,
            pickDate: new Date().toDateString(),
            returnDate: null
            })
        await book.save();


        // const index = this.books.findIndex((book) => book.id === id);
        // if (index === -1) throw new HttpError(404, "Books not found.");
        //const book = this.books[index];
        //book.status = BookStatus.ON_HAND;
        // book.pickList.push({
        //     reader: reader,
        //     pickDate: new Date().toDateString(),
        //     returnDate: null
        // })
    }

    removeBook = async (id: string): Promise<Book> => {
        const book = await BookDbModel.findByIdAndDelete(id)
        if (!book) throw new HttpError(404, "Book not found.");
        // @ts-ignore
        return book;
        // const index = this.books.findIndex((item) => item.id === id);
        // if (index === -1) throw new HttpError(404, "Books not found.");
        // else return this.books.splice(index, 1) [0];
    }



    returnBook = async (id: string): Promise<void> => {
        const book = await BookDbModel.findById({id});
        // @ts-ignore
        if (!book) throw new HttpError(404, "Books not found.");
        if (book.status !== BookStatus.ON_HAND) throw new HttpError(409, "his book is on stock");
        // @ts-ignore

        book.status = BookStatus.ON_STOCK;

        // @ts-ignore
        book.pickList[book.pickList.length - 1].returnDate = new Date().toDateString();
        // @ts-ignore
        await book.save();

        // const index = this.books.findIndex((book) => book.id === id);
        // if (index === -1) throw new HttpError(404, "Books not found.");
        //const book = this.books[index];
        //book.status = BookStatus.ON_STOCK;

        //const lastRecord = book.pickList[book.pickList.length - 1];
        // if (!lastRecord) throw new HttpError(409, "No pickup record to return.");
        // lastRecord.reader = "";
        // lastRecord.returnDate = new Date().toISOString();
        //
    }
}

