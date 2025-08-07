import {LibService} from "../services/libService.ts";
import {LibServiceImplEmbedded} from "../services/libServiceImplEmbedded.ts";
import {Request, Response} from "express";
import {Book, BookDto, BookGenres} from "../model/Book.ts";
import {HttpError} from "../errorHandler/HttpError.ts";
import {convertBookDtoToBook} from "../utils/tools.js";

export class BookController {

    private LibService: LibService = new  LibServiceImplEmbedded();

    getAllBooks(req: Request, res: Response) {
        const result = this.LibService.getAllBooks();
        res.status(200).json(result);
}

    addBook(req: Request, res: Response) {
        const dto = req.body as BookDto;
        const book: Book = convertBookDtoToBook(dto);
        const result = this.LibService.addBook(book);
        if (result)
            res.status(201).json(book);
        else throw new HttpError(409, "Book not added. ID conflict");

    }

    removeBook(req: Request, res: Response) {
        const id = req.params.id;
        const book = this.LibService.removeBook(id);
        res.status(200).json(book);
    }

    getBooksByGenre(req: Request, res: Response) {
        const genreParam: string = req.params.genre.toString();
        const genre: BookGenres = genreParam as BookGenres;
        const result: Book [] = this.LibService.getBooksByGenre(genre);
        res.status(200).json(result);
    }


    pickUpBook(req: Request, res: Response) {
        const id = req.params.id;
        const reader = req.params.reader;
        this.LibService.pickUpBook(id, reader);
        res.status(201).send("Book picked up");
    }

    returnBook(req: Request, res: Response) {
        const id = req.params.id;
        this.LibService.returnBook(id);
        res.status(200).send("Book returned");
    }
}