import React, { useState, useEffect } from "react";
import { PostForm, Container } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../services/postService";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    let cancelled = false;
    postService.get(slug).then((fetched) => {
      if (!cancelled && fetched) setPost(fetched);
    });
    return () => {
      cancelled = true;
    };
  }, [slug, navigate]);

  if (!post) return null;
  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
