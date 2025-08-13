import {LibService} from "./libService.ts";
import {Book, BookGenres, BookStatus} from "../model/Book.ts";
import {HttpError} from "../errorHandler/HttpError.js";


export class LibServiceImplEmbedded implements LibService {
    private books: Book[] = [];

    async addBook  (book: Book): Promise<boolean>  {
        const index = this.books.findIndex((item) => item.id === book.id);
        if (index === -1) {
            this.books.push(book);
            return new Promise(resolve => resolve(true))
        }
        return Promise.resolve(false);
    }

    async getAllBooks(): Promise<Book[]> {
        return [...this.books]
    }

    async getBooksByGenre (genre: BookGenres): Promise<Book[]> {
        const books: Book[] = this.books.filter(book => book.genre === genre);
        if (books.length === 0) throw new HttpError(404, "Books not found.");
        return books;
    }

    async pickUpBook(id: string, reader: string): Promise<void> {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) throw new HttpError(404, "Books not found.");
        const book = this.books[index];
        book.status = BookStatus.ON_HAND;
        book.pickList.push({
            reader: reader,
            pickDate: new Date().toDateString(),
            returnDate: null
        })
    }

    async removeBook(id: string): Promise<Book> {
        const index = this.books.findIndex((item) => item.id === id);
        if (index === -1) throw new HttpError(404, "Books not found.");
        else return this.books.splice(index, 1) [0];
    }

    async returnBook (id: string): Promise<void> {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) throw new HttpError(404, "Books not found.");
        const book = this.books[index];
        book.status = BookStatus.ON_STOCK;

        const lastRecord = book.pickList[book.pickList.length - 1];
        if (!lastRecord) throw new HttpError(409, "No pickup record to return.");
        lastRecord.reader = "";
        lastRecord.returnDate = new Date().toISOString();
    }

}

export const libServiceEmbedded = new LibServiceImplEmbedded();
