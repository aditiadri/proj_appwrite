import React from "react";
import { Link } from "react-router-dom";
import postService from "../services/postService";

// Expect a post object spread in: { $id/slug, title, featured_image or featuredImage }
function Postcards(post) {
  const slug = post.slug || post.$id || post.id;
  const imagePath = post.featuredImage || post.featured_image;
  const imgUrl = postService.imagePublicUrl(imagePath);
  return (
    <Link to={`/post/${slug}`}>
      <div className="w-full bg-gray-100 rounded-2xl">
        <div className="w-full justify-center mb-4">
          {imagePath && (
            <img
              src={imgUrl}
              alt={post.title}
              className="rounded-2xl w-full object-cover"
            />
          )}
        </div>
        <h2 className="text-2xl font-extrabold px-2 pb-2">{post.title}</h2>
      </div>
    </Link>
  );
}

export default Postcards;
