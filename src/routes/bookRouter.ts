import express, {Request, Response} from "express";
import {BookController} from "../controllers/BookController.js";
import {BookDtoSchema, BookGenresDtoSchema, BookIdDtoSchema, BookPickUpDtoSchema} from "../validation/joiSchemas.js";
import {validation} from "../validation/validation.js";

export const bookRouter = express.Router();

const controller = new BookController();

bookRouter.get('/', (req: Request, res: Response) => {
    controller.getAllBooks(req, res);
});

bookRouter.get('/:genre', validation(BookGenresDtoSchema),controller.getBooksByGenre.bind(controller))

bookRouter.post('/', validation(BookDtoSchema), controller.addBook.bind(controller));

bookRouter.delete('/:id', validation(BookIdDtoSchema), controller.removeBook.bind(controller));

bookRouter.patch('/:id/:reader', validation(BookPickUpDtoSchema), controller.pickUpBook.bind(controller));

bookRouter.patch('/:id', validation(BookIdDtoSchema),  controller.returnBook.bind(controller));
