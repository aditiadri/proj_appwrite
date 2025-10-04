import { supabase } from "../lib/supabaseClient";

export class AuthService {
    constructor() {
        this.client = supabase;
    }

    async signUp({ email, password }) {
        const { data, error } = await this.client.auth.signUp({ email, password });
        if (error) throw error;
        return data.user ?? data;
    }

    async signIn({ email, password }) {
        const { data, error } = await this.client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.session ?? data;
    }

    async getUser() {
        const { data, error } = await this.client.auth.getUser();
        if (error) return null;
        return data.user || null;
    }

    async signOut() {
        const { error } = await this.client.auth.signOut();
        if (error) throw error;
    }

    /* ----------------------------------------------
       Backward compatibility layer (Appwrite -> Supabase)
       Old code expected: createAccount, login, logout, getCurrentUser
       These map to new methods so we don't have to refactor everywhere immediately.
    ------------------------------------------------*/
    async createAccount(args) {
        return this.signUp(args);
    }
    async login(args) {
        return this.signIn(args);
    }
    async logout() {
        return this.signOut();
    }
    async getCurrentUser() {
        return this.getUser();
    }
}

const authService = new AuthService();
export default authService;
