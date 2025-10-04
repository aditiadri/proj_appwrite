// Supabase-backed replacement for previous Appwrite config
import { supabase } from "../lib/supabaseClient";

export class Service {
  constructor() {
    this.client = supabase;
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const { data, error } = await this.client
        .from("posts")
        .insert({
          title,
          slug,
          content,
          featured_image: featuredImage,
          status,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Supabase serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const { data, error } = await this.client
        .from("posts")
        .update({
          title,
          content,
          featured_image: featuredImage,
          status,
        })
        .eq("slug", slug)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Supabase serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      const { error } = await this.client
        .from("posts")
        .delete()
        .eq("slug", slug);
      if (error) throw error;
      return true;
    } catch (error) {
      console.log("Supabase serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const { data, error } = await this.client
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(" getPost error", error);
      return false;
    }
  }

  async getPosts(queries = { status: "active" }) {
    try {
      let query = this.client.from("posts").select("*");
      if (queries?.status) {
        query = query.eq("status", queries.status);
      }
      const { data, error } = await query;
      if (error) throw error;
      return { documents: data };
    } catch (error) {
      console.log("Supabase serive :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await this.client.storage
        .from("images")
        .upload(fileName, file);
      if (error) throw error;
      return { $id: data.path };
    } catch (error) {
      console.log("Supabase serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      const { error } = await this.client.storage
        .from("images")
        .remove([fileId]);
      if (error) throw error;
      return true;
    } catch (error) {
      console.log("Supabase serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    const { data } = this.client.storage.from("images").getPublicUrl(fileId);
    return data.publicUrl;
  }
}
