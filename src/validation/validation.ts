import e, {NextFunction, Response, Request} from "express";
import {ObjectSchema} from 'joi';
import {HttpError} from "../errorHandler/HttpError.js";


export const validationBody = (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) throw new HttpError(400, "Body required");
        const {error} = schema.validate(req.body);
        console.log(error?.details)
        if (error) throw new HttpError(400, error.message);
        next();
    }

export const validationParams = (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
            if (!req.params) throw new HttpError(400, "Body required");
            const {error} = schema.validate(req.params);
            console.log(error?.details)
            if (error) throw new HttpError(400, error.message);
            next();
    }
