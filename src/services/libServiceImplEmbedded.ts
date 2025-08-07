import {LibService} from "./libService.ts";
import {Book, BookGenres, BookStatus} from "../model/Book.ts";

export class LibServiceImplEmbedded implements LibService{
    private books: Book[] = [];

    addBook(book: Book): boolean {
        const index = this.books.findIndex((item) => item.id === book.id);
        if (index === -1) {
            this.books.push(book);
            return true;
        }
        return false;
    }

    getAllBooks(): Book[] {
        return [...this.books];
    }

    getBooksByGenre(genre: BookGenres): Book[] {
        return this.books.filter((item) => item.genre === genre);
    }

    pickUpBook(id: string, reader: string): void {
        const index = this.books.findIndex((book) => book.id === id);
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
        if (index === -1) return null;
        else return this.books.splice(index, 1) [0];
    }

    returnBook(id: string): void {
        const index = this.books.findIndex((book) => book.id === id);
        const book = this.books[index];
        book.status = BookStatus.ON_STOCK;

        const lastRecord = book.pickList[book.pickList.length - 1];
        lastRecord.reader = "";
        lastRecord.returnDate = new Date().toISOString();
        }




    }

