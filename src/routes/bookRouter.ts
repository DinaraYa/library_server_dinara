import express from "express";
import * as controller from '../controllers/BookController.js';
import {BookDtoSchema, BookGenresDtoSchema, BookIdDtoSchema, BookPickUpDtoSchema} from "../validation/joiSchemas.js";
import { validationBody, validationParams} from "../validation/validation.js";

export const bookRouter = express.Router();



bookRouter.get('/', controller.getAllBooks.bind(controller));

bookRouter.get('/genre', validationParams(BookGenresDtoSchema),controller.getBooksByGenre.bind(controller))

bookRouter.post('/', validationBody(BookDtoSchema), controller.addBook.bind(controller));

bookRouter.delete('/remove', validationParams(BookIdDtoSchema), controller.removeBook.bind(controller));

bookRouter.patch('/pickup', validationParams(BookPickUpDtoSchema), controller.pickUpBook.bind(controller));

bookRouter.patch('/return', validationParams(BookIdDtoSchema),  controller.returnBook.bind(controller));

bookRouter.get('/reader_list', controller.getBooksByReader.bind(controller));

//bookRouter.get('/genre_status/:genre/:status', controller. getBooksByGenreAndStatus.bind(controller));