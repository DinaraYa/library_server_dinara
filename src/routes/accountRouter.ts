import express from "express";
import * as controller from "../controllers/accountController.js"
import {validationBody} from "../validation/validation.js";
import {ChangePasswordDtoSchema, ReaderDtoSchema} from "../validation/joiSchemas.js";

export const accountRouter = express.Router();

accountRouter.post('/', validationBody(ReaderDtoSchema), controller.addAccount);

accountRouter.get('/reader/:id', controller.getAccount);

accountRouter.patch('/password', validationBody(ReaderDtoSchema), controller.changePassword);

accountRouter.delete('/:id/', controller.removeAccount);