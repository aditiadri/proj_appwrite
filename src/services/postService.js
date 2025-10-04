import { supabase } from "../lib/supabaseClient";

export class PostService {
    constructor() {
        this.client = supabase;
    }

    async create({ title, slug, content, featuredImage, status, userId }) {
        const { data, error } = await this.client.from("posts").insert({
            title,
            slug,
            content,
            featured_image: featuredImage,
            status,
            user_id: userId,
        }).select().single();
        if (error) throw error;
        return data;
    }

    async update(slug, { title, content, featuredImage, status }) {
        const { data, error } = await this.client.from("posts").update({
            title,
            content,
            featured_image: featuredImage,
            status,
        }).eq("slug", slug).select().single();
        if (error) throw error;
        return data;
    }

    async remove(slug) {
        const { error } = await this.client.from("posts").delete().eq("slug", slug);
        if (error) throw error;
        return true;
    }

    async get(slug) {
        const { data, error } = await this.client.from("posts").select("*").eq("slug", slug).single();
        if (error) throw error;
        return data;
    }

    async list({ status = "active" } = {}) {
        let query = this.client.from("posts").select("*");
        if (status) query = query.eq("status", status);
        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async uploadImage(file) {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { data, error } = await this.client.storage.from("images").upload(fileName, file);
        if (error) throw error;
        return data.path; // return storage path
    }

    async deleteImage(path) {
        if (!path) return true;
        const { error } = await this.client.storage.from("images").remove([path]);
        if (error) throw error;
        return true;
    }

    imagePublicUrl(path) {
        if (!path) return "";
        const { data } = this.client.storage.from("images").getPublicUrl(path);
        return data.publicUrl;
    }
}

const postService = new PostService();
export default postService;
