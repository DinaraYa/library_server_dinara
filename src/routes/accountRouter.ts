import express, {Response} from "express";
import * as controller from "../controllers/accountController.js"
import {validationBody} from "../validation/validation.js";
import {
    ChangePasswordDtoSchema,
    ChangeRolesSchema, LoginSchema,
    ReaderDtoSchema,
    UpdateAccountDtoSchema
} from "../validation/joiSchemas.js";



export const accountRouter = express.Router();


accountRouter.post('/', validationBody(ReaderDtoSchema), controller.addAccount);

accountRouter.get('/reader_id', controller.getAccountById);

accountRouter.delete('/',  controller.removeAccount);

accountRouter.patch('/password', validationBody(ChangePasswordDtoSchema), controller.changePassword);

accountRouter.patch('/', validationBody(UpdateAccountDtoSchema), controller.updateAccount);

accountRouter.put('/roles', validationBody(ChangeRolesSchema), controller.changeRoles);

accountRouter.post('/login', validationBody(LoginSchema), controller.login);

