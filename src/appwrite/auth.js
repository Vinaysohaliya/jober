import config from '../config/config'
import { Client, ID, Account } from 'appwrite';

export class AccountService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(config.appWriteUrl),
        this.client.setProject(config.appWriteProject)
        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log("sign ok");
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email
        , password }) {
        try {
            console.log("login ko");
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getuser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }
    
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authService = new AccountService();
export default authService;