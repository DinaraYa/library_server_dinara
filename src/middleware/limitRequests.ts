import {NextFunction, Response} from "express";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {configuration} from "../config/libConfig.js";
import {HttpError} from "../errorHandler/HttpError.js";




export const limitRequests = (requestsList: Map<number, number[]>) => {
     return ( req: AuthRequest, res: Response, next: NextFunction)=> {

         const id = req.userId;
         const roles = req.roles;
         console.log("REQ " + id)
         console.log("REQ " + roles)

         if (!id || !roles || !roles.includes(Roles.USER)) {
             return next();
         }

         const curTime = Date.now();
         const requestsByUser = requestsList.get(id);

         if (!requestsByUser) {
             requestsList.set(id, [curTime])
         }
         else {
             if(curTime - requestsByUser[0] > configuration.timeWindow ) {
                 requestsList.set(id, [curTime])
             } else if(requestsByUser.length < configuration.userLimit) {
                 requestsByUser.push(curTime)
             }
             else throw new HttpError(403, "Quantity of requests is limited for this user");
         }

         next();
     }
}