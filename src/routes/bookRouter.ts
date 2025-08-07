import express, {Request, Response} from "express";
import {BookController} from "../controllers/BookController.js";
import {BookDtoSchema, BookGenresDtoSchema, BookIdDtoSchema, BookPickUpDtoSchema} from "../joiSchemas/bookShemas.js";

export const bookRouter = express.Router();

const controller = new BookController();

bookRouter.get('/', (req: Request, res: Response) => {
    controller.getAllBooks(req, res);
});

bookRouter.get('/:genre', (req: Request, res: Response) => {
    const {error} = BookGenresDtoSchema.validate(req.params);
    if (error) {
        res.status(400).send({message: error.message});
    }
    controller.getBooksByGenre(req, res);
})


bookRouter.post('/', (req: Request, res: Response) => {
    const {error} = BookDtoSchema.validate(req.body);
    if (error) {
        res.status(400).send({message: error.message});
    }
    controller.addBook(req, res);
});

bookRouter.delete('/:id', (req: Request, res: Response) => {
    const {error} = BookIdDtoSchema.validate(req.params);
    if (error) {
        res.status(400).send({message: error.message});
    }
    controller.removeBook(req, res);
})

bookRouter.patch('/:id/:reader', (req: Request, res: Response) => {
   const {error} = BookPickUpDtoSchema.validate(req.params);
    if (error) {
        res.status(400).send({message: error.message});
    }
    controller.pickUpBook(req, res);
})

bookRouter.patch('/:id', (req: Request, res: Response) => {
    const {error} = BookIdDtoSchema.validate(req.params);
    if (error) {
        res.status(400).send({message: error.message});
    }
    controller.returnBook(req, res);
})