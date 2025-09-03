import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";
import {LoginPassType, Roles} from "../utils/libTypes.js";
import {getJWT} from "../utils/tools.js";


export class AccountServiceImplMongo implements AccountService {

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id).exec();
        console.log("body " + temp)
        if (temp) throw new HttpError(409, "Reader already exists");

        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    }

    async changePassword(id: number, oldPassword:string, newPassword: string, ): Promise<void> {
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

    async updateAccount (id: number, userName?: string, email?: string, birthdate?: string): Promise<Reader> {
        const profile = await ReaderModel.findById(id);
        console.log("PROFILE ", profile);
        if(!profile) throw new HttpError(404, "Profile not found");
        if(userName !== undefined) profile.userName = userName;
        if(email !== undefined) profile.email = email;
        if(birthdate !== undefined) profile.birthdate = birthdate;
        await profile.save();
        return profile;
    }



    async getAccountById(id: number): Promise<Reader> {
        const reader = await ReaderModel.findById(id).exec();
        if (!reader) throw new HttpError(404, "Reader not found");
        return reader;
    }

    async removeAccount(id: number): Promise<Reader> {
        const user = await ReaderModel.findByIdAndDelete(id).exec();
        if (!user) throw new HttpError(404, "Reader not found");
        return user;
    }


    async changeRoles(id: number, newRoles: Roles[]): Promise<Reader> {
        const result =
            await ReaderModel.findByIdAndUpdate(id, {roles : newRoles},{new:true})
        if(!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

    async getAccountByName(reader: string) {
        const account = await ReaderModel.findOne({userName: reader});
        if(!account) throw new HttpError(404, "Account not found");
        return account._id;
    }


    async login(credentials: LoginPassType): Promise<string> {
        const profile = await ReaderModel.findById(credentials.userId);
        if(!profile || !bcrypt.compareSync(credentials.password, profile.passHash))
            throw new HttpError(401, "Incorrect login or password");
        const token = getJWT(credentials.userId, profile.roles as Roles[]);
        return token;
    }
}

export const accountServiceMongo = new AccountServiceImplMongo();