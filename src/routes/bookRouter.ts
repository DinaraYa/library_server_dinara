import express, {Request, Response} from "express";
import {BookController} from "../controllers/BookController.js";
import {BookDtoSchema, BookGenresDtoSchema, BookIdDtoSchema, BookPickUpDtoSchema} from "../validation/joiSchemas.js";
import { validationBody, validationParams} from "../validation/validation.js";

export const bookRouter = express.Router();

const controller = new BookController();

bookRouter.get('/', controller.getAllBooks.bind(controller));

bookRouter.get('/:genre', validationParams(BookGenresDtoSchema),controller.getBooksByGenre.bind(controller))

bookRouter.post('/', validationBody(BookDtoSchema), controller.addBook.bind(controller));

bookRouter.delete('/:id', validationParams(BookIdDtoSchema), controller.removeBook.bind(controller));

bookRouter.patch('/:id/:reader', validationParams(BookPickUpDtoSchema), controller.pickUpBook.bind(controller));

bookRouter.patch('/:id', validationParams(BookIdDtoSchema),  controller.returnBook.bind(controller));
