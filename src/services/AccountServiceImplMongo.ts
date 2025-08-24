import {AccountService} from "./accountService.js";
import {Reader, ReaderDto} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";

export class AccountServiceImplMongo implements AccountService {

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id).exec();
        console.log("body " + temp)
        if (temp) throw new HttpError(409, "Reader already exists");

        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    }

    async changePassword(id: string, oldPassword:string, newPassword: string, ): Promise<void> {
        console.log(id, oldPassword, newPassword);
        const account = await ReaderModel.findById(id);
        console.log(account);
        if (!account) throw new HttpError(404, "Account not found");
        const checkPass = bcrypt.compareSync(oldPassword, account.passHash);
        console.log("checkPass", checkPass);
        if(!checkPass) throw new HttpError(403, "");
        else{
            const newHash = bcrypt.hashSync(newPassword, 10);
            account.passHash = newHash;
            await account.save();
        }
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