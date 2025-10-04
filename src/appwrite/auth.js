// ...existing code...
import { supabase } from "../lib/supabaseClient";

export class AuthService {
  constructor() {
    this.client = supabase;
  }

  async createAccount({ email, password }) {
    try {
      const { data, error } = await this.client.auth.signUp({ email, password });
      console.debug("AuthService.createAccount ->", { data, error });
      if (error) throw error;
      return data.user ?? data;
    } catch (err) {
      console.error("AuthService.createAccount error:", err);
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });
      console.debug("AuthService.login ->", { data, error });
      if (error) throw error;
      return data.session ?? data;
    } catch (err) {
      console.error("AuthService.login error:", err);
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      const { data, error } = await this.client.auth.getUser();
      console.debug("AuthService.getCurrentUser ->", { data, error });
      if (error) return null;
      return data.user || null;
    } catch (err) {
      console.error("AuthService.getCurrentUser error:", err);
      return null;
    }
  }

  async logout() {
    try {
      const { error } = await this.client.auth.signOut();
      console.debug("AuthService.logout ->", { error });
      if (error) throw error;
    } catch (err) {
      console.error("AuthService.logout error:", err);
      throw err;
    }
  }
}

const authService = new AuthService();
export default authService;
// ...existing code...