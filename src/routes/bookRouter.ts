import express, {Request, Response} from "express";
import {BookController} from "../controllers/BookController.js";

export const bookRouter = express.Router();

const controller = new BookController();

bookRouter.get('/', (req: Request, res: Response) => {
    controller.getAllBooks(req, res);
})


bookRouter.post('/', (req: Request, res: Response) => {
    controller.addBook(req, res);
});