import express, {NextFunction} from "express";
//import {PORT} from "./config/libConfig.ts";
import {libRouter} from "./routes/libRouter.ts";
import morgan from 'morgan';
import * as fs from "node:fs";
import dotenv from 'dotenv';




export const launchServer = () => {
    // ==================== load environments ====================

    dotenv.config();
    console.log("process.env "+ process.env)


    const app = express();
    app.listen(process.env.PORT, () => console.log(`Server runs http://localhost:${process.env.PORT}`));
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


    // function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    //     console.error("🔥 Server error:", err);   // вот тут будет полный объект ошибки
    //     // @ts-ignore
    //     res.status(500).json({ message: "Internal Server Error", error: err.message });
    // }


    //================ ErrorHandler ================

    //app.use(errorHandler);

}