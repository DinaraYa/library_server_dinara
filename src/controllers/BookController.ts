import {LibService} from "../services/libService.ts";
import {LibServiceImplEmbedded} from "../services/libServiceImplEmbedded.ts";
import {Request, Response} from "express";
import {Book, BookDto, BookGenres} from "../model/Book.ts";
import {HttpError} from "../errorHandler/HttpError.ts";
import {convertBookDtoToBook} from "../utils/tools.js";

export class BookController {

    private LibService: LibService = new  LibServiceImplEmbedded();

    async getAllBooks(req: Request, res: Response) {
        const result = await this.LibService.getAllBooks();
        res.status(200).json(result);
}

    async addBook(req: Request, res: Response) {
        const dto = req.body as BookDto;
        const book: Book = convertBookDtoToBook(dto);
        const result = await this.LibService.addBook(book);
        if (result)
            res.status(201).json(book);
        else throw new HttpError(409, "Book not added. ID conflict");

    }

    async removeBook(req: Request, res: Response) {
        const id = req.params.id;
        const book = await this.LibService.removeBook(id);
        res.status(200).json(book);
    }

   async getBooksByGenre(req: Request, res: Response) {
        const genreParam: string = req.params.genre.toString();
       console.log(genreParam);
        const genre: BookGenres = genreParam as BookGenres;
       console.log("genre", genre);
        const result: Book [] = await this.LibService.getBooksByGenre(genre);
       console.log(result);
        res.status(200).json(result);
    }


    async pickUpBook(req: Request, res: Response) {
        const id = req.params.id;
        const reader = req.params.reader;
        await this.LibService.pickUpBook(id, reader);
        res.status(201).send("Book picked up");
    }

    async returnBook(req: Request, res: Response) {
        const id = req.params.id;
        await this.LibService.returnBook(id);
        res.status(200).send("Book returned");
    }
}