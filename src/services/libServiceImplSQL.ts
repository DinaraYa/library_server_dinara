import {LibService} from "./libService.js";
import {Book, BookGenres, BookStatus} from "../model/Book.js";
import {pool} from "../config/libConfig.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {returnBook} from "../controllers/BookController.js";

export class LibServiceImplSQL implements LibService {

    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status]);
        if(!result)
        return Promise.resolve(false);
        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const [result] = await pool.query('SELECT * from books');
        return Promise.resolve(result as Book[]);
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const [result] = await pool.query('SELECT * FROM books WHERE genre = ?', [genre]);
        return Promise.resolve(result as Book[]);
    }

    async pickUpBook(id: string, reader: string): Promise<void> {
        await pool.query('UPDATE books SET status = ? WHERE id = ?', [BookStatus.ON_HAND, id]);
        await pool.query('UPDATE readers_books SET pick_date = ? WHERE id_book = ?', [new Date().toDateString(), id]);
        await pool.query('UPDATE readers SET reader_name = ? WHERE id_reader = ?', [reader])
        return Promise.resolve(undefined);
    }

    async returnBook(id: string): Promise<void> {
        await pool.query('UPDATE books  SET status = ? WHERE id = ?', [BookStatus.ON_STOCK, id]);
        await pool.query('UPDATE readers_books SET return_date = ? WHERE id_book =?', [new Date().toDateString(), id])
        return Promise.resolve(undefined);
    }

    async removeBook(id: string): Promise<Book> {
        const [result] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
        const book = (result as Book[])[0];
        if (!book) throw new HttpError(404, `Book with id ${id} not found`);
        const removeBook = await pool.query('DELETE FROM books WHERE id = ?', [id]);
        return book;
    }

    async getBooksByReader(id: number): Promise<Book[]> {
        throw new HttpError(404, "Books not found.");
    }
}

export const LibServiceSQL= new LibServiceImplSQL();