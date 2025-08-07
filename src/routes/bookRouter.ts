import express, {Request, Response} from "express";
import {BookController} from "../controllers/BookController.js";

export const bookRouter = express.Router();

const controller = new BookController();

bookRouter.get('/', (req: Request, res: Response) => {
    controller.getAllBooks(req, res);
});

bookRouter.get('/:genre', (req: Request, res: Response) => {
    controller.getBooksByGenre(req, res);
})


bookRouter.post('/', (req: Request, res: Response) => {
    controller.addBook(req, res);
});

bookRouter.delete('/:id', (req: Request, res: Response) => {
    controller.removeBook(req, res);
})

bookRouter.patch('/:id/:reader', (req: Request, res: Response) => {
    controller.pickUpBook(req, res);
})

bookRouter.patch('/:id', (req: Request, res: Response) => {
    controller.returnBook(req, res);
})