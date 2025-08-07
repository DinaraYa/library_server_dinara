import {LibService} from "./libService.ts";
import {Book, BookGenres, BookStatus} from "../model/Book.ts";
import {HttpError} from "../errorHandler/HttpError.js";


export class LibServiceImplEmbedded implements LibService {
    private books: Book[] = [];

    addBook(book: Book): boolean {
        const index = this.books.findIndex((item) => item.id === book.id);
        if (index === -1) {
            this.books.push(book);
            return true;
        } else
            throw new HttpError(409, `Book with id ${book.id} already exists`);
    }

    getAllBooks(): Book[] {
        return [...this.books];
    }

    getBooksByGenre(genre: BookGenres): Book[] {
        const books = this.books.filter((item) => item.genre === genre);
        if (books.length === 0) throw new HttpError(404, "Books not found.");
        return books;
    }

    pickUpBook(id: string, reader: string): void {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) throw new HttpError(404, "Books not found.");
        const book = this.books[index];
        book.status = BookStatus.ON_HAND;
        book.pickList.push({
            reader: reader,
            pickDate: new Date().toISOString(),
            returnDate: null
        })
    }

    removeBook(id: string): Book | null {
        const index = this.books.findIndex((item) => item.id === id);
        if (index === -1) throw new HttpError(404, "Books not found.");
        else return this.books.splice(index, 1) [0];
    }

    returnBook(id: string): void {
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

