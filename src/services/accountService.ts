import {Reader} from "../model/Reader.js";
import {LoginPassType,  Roles} from "../utils/libTypes.js";

export interface AccountService {
    addAccount: (reader: Reader) => Promise<void>;
    getAccountById: (id: number) => Promise<Reader>;
    removeAccount: (id: number) => Promise<Reader>;
    changePassword: (id: number, newPassword: string, oldPassword:string) => Promise<void>;
    updateAccount: (id: number, userName?: string, email?: string, birthdate?: string ) => Promise<Reader>;
    changeRoles: (id:number, newRoles:Roles[]) => Promise<Reader>;
    login: (credentials: LoginPassType) => Promise<string>;
}