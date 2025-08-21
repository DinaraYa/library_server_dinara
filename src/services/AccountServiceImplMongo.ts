import {AccountService} from "./accountService.js";
import {Reader, ReaderDto} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class AccountServiceImplMongo implements AccountService {

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id).exec();
        console.log("body " + temp)
        if (temp) throw new HttpError(409, "Reader already exists");

        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    }

    async changePassword(reader: Reader): Promise<void> {
        // const reader = await ReaderModel.findByIdAndUpdate(
        //     id,
        //     {passHash: newPassword},
        //     {new: true}
        // ).exec();
        // if (!reader) throw new HttpError(409, "Reader not found");
        const temp = await ReaderModel.findById(reader._id).exec();
        console.log("body " + temp)
        if (!temp) throw new HttpError(409, "Reader not found");
        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    }

    async getAccount(id: string): Promise<Reader> {
        const reader = await ReaderModel.findById(id).exec();
        console.log("READER SERVICE " + reader)
        if (!reader) throw new HttpError(404, "Reader not found");
        return reader;
    }

    async removeAccount(id: string): Promise<Reader> {
        const user = await ReaderModel.findByIdAndDelete(id).exec();
        if (!user) throw new HttpError(404, "Reader not found");
        return user;
    }

}

export const accountServiceMongo = new AccountServiceImplMongo();