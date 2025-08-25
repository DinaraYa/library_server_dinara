import express from "express";
import {validationBody} from "../validation/validation.js";
import {ChangePasswordDtoSchema, UpdateProfileDtoSchema} from "../validation/joiSchemas.js";
import * as controller from "../controllers/accountController.js";


export const updateAccountRouter = express.Router();



updateAccountRouter.patch('/password', validationBody(ChangePasswordDtoSchema), controller.changePassword);

updateAccountRouter.patch('/profile', validationBody(UpdateProfileDtoSchema), controller.updateProfile);


