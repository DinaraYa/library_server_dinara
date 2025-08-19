import {LibService} from "./libService.js";
import {Book, BookGenres, BookStatus} from "../model/Book.js";
import {pool} from "../config/libConfig.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class LibServiceImplSQL implements LibService {

    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status]);
        if(!result)
        return Promise.resolve(false);
        return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const [rows] = await pool.query('SELECT * from books');
        return Promise.resolve(rows as Book[]);
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const [rows] = await pool.query('SELECT * FROM books WHERE genre = ?', [genre]);
        return Promise.resolve(rows as Book[]);
    }

    async getBooksByGenreAndStatus(genre: BookGenres, status: BookStatus): Promise<Book[]> {
        const [rows] = await pool.query('SELECT * FROM books WHERE genre = ? AND status =?', [genre, status] );
        return Promise.resolve(rows as Book[]);

    }

    async pickUpBook(id: string, reader: string): Promise<void> {
        await pool.query('UPDATE books SET status = ? AND pickList.reader =? WHERE id = ?', [BookStatus.ON_HAND,reader, id]);
        return Promise.resolve(undefined);
    }

    async removeBook(id: string): Promise<Book> {
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
        const book = (rows as Book[])[0];
        if (!book) throw new HttpError(404, `Book with id ${id} not found`);
        const removeBook = await pool.query('DELETE FROM books WHERE id = ?', [id]);
        return book;
    }

    async returnBook(id: string): Promise<void> {
        await pool.query('UPDATE books  SET status = ? WHERE id = ?', [BookStatus.ON_STOCK, id]);
        return Promise.resolve(undefined);
    }

}

export const LibServiceSQL= new LibServiceImplSQL();