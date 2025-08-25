import {AuthRequest, Roles} from "../utils/libTypes.js";
import {Response, NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";

export const authorize = (arr: Record<string, Roles[]>) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
    const route = req.method + req.path;
        console.log("req.method "+req.method)
        console.log("req.path"+req.path)
        console.log("ROUTE " + route);
        const roles = req.roles;
        console.log("roles " + roles);
    if(roles?.some(r => arr[route].includes(r)))
    next();
    else throw new HttpError(403, "");
    }