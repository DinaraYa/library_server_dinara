import express from "express";
import {PORT} from "./config/libConfig.ts";
import {libRouter} from "./routes/libRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";
import morgan from 'morgan';
import * as fs from "node:fs";



export const launchServer = () => {
    const app = express();
    app.listen(PORT, () => console.log(`Server runs http://localhost:${PORT}`));
    const logStream = fs.createWriteStream('access.log', { flags: 'a' });

    // ===================== Middleware ===================

    app.use(express.json());
    app.use(morgan('dev')); // пишем в консоль

    app.use(morgan('combined', { stream: logStream }));

    // app.use((req: Request, res:Response, next:NextFunction) => next())



    // ===================== Router ===================

    app.use('/api' , libRouter);

    app.use((req, res) => {
        res.status(404).send("Page not found")
    })

    //================ ErrorHandler ================

    app.use(errorHandler)

}