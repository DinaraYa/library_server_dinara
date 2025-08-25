import express, {Response} from "express";
import * as controller from "../controllers/accountController.js"
import {validationBody} from "../validation/validation.js";
import { ReaderDtoSchema} from "../validation/joiSchemas.js";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {updateAccountRouter} from "./updateAccountRouter.js";


export const accountRouter = express.Router();



accountRouter.use('/update', updateAccountRouter);

accountRouter.post('/', validationBody(ReaderDtoSchema), controller.addAccount);

accountRouter.get('/reader', async (req: AuthRequest, res: Response) => {
    if(req.roles?.includes(Roles.USER)) {
        await controller.getAccount(req, res);
        return;
    }
    throw new HttpError(403, "Forbidden");
} );

accountRouter.delete('/',  controller.removeAccount);



//accountRouter.patch('/password', validationBody(ChangePasswordDtoSchema), controller.changePassword);



