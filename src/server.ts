import express, {NextFunction} from "express";
import {PORT, SKIP_ROUTES} from "./config/libConfig.ts";
import {libRouter} from "./routes/libRouter.ts";
import morgan from 'morgan';
import * as fs from "node:fs";
import dotenv from 'dotenv';
import {errorHandler} from "./errorHandler/errorHandler.js";
import {accountRouter} from "./routes/accountRouter.js";
import {authenticate, skipRoutes} from "./middleware/authentication.js";
import {accountServiceMongo} from "./services/AccountServiceImplMongo.js";
import {authorize} from "./middleware/authorization.js";
import {routeRoles} from "./middleware/permissions.js";




export const launchServer = () => {
    // ==================== load environments ====================

    dotenv.config();
    console.log("process.env "+ process.env)

    const app = express();
    //app.listen(process.env.PORT, () => console.log(`Server runs http://localhost:${process.env.PORT}`));
    app.listen(PORT, () => console.log(`Server runs http://localhost:${PORT}`));
    const logStream = fs.createWriteStream('access.log', { flags: 'a' });

    // ===================== Middleware ===================
    app.use(authenticate(accountServiceMongo));
    //app.use(authorize(routeRoles));
    app.use(skipRoutes(SKIP_ROUTES));
    app.use(express.json());
    app.use(morgan('dev')); // пишем в консоль

    app.use(morgan('combined', { stream: logStream }));

    // app.use((req: Request, res:Response, next:NextFunction) => next())



    // ===================== Router ===================

    app.use('/accounts', accountRouter)
    app.use('/api' , libRouter);

    app.use((req, res) => {
        res.status(404).send("Page not found")
    })

    // function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    //     console.error("Server error: ", err);   // вот тут будет полный объект ошибки
    //     // @ts-ignore
    //     res.status(500).json({ message: "Internal Server Error", error: err.message });
    // }

    //================ ErrorHandler ================

    app.use(errorHandler);

}