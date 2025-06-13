import { Await } from "react-router-dom";
import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";
export class AuthServices{
    client =new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client); 
        
    }
async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // call another method
            return this.login({email,password});
        } else {
            return userAccount;
        }
    } catch (error) {
        throw error;
    }
}

async login(email,password){
    try {
        await.this.account.createEmailSession(email,password);
    } catch (error) {
        throw error;
    }
}

async getCurrentUser(){
    try {
    return  await this.account.get();
    } catch (error) {
        throw error;
    }

    return null;
}
async logout(){
    try {
       return await this.account.deleteSessions();
    } catch (error) {
       
        console.log("logout error", error)
        
    }
}
}

export default AuthServices

const authservice=new Authservices(); 
