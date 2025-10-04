import React, { useState, useEffect } from "react";
import { Postcards, Container } from "../components";
import postService from "../services/postService";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    postService.list({ status: "active" }).then((result) => {
      if (!cancelled && result) {
        setPosts(result);
      }
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true; // prevent state set after unmount
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8">
        <Container>
          <p>Loading posts...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id || post.id} className="p-3 w-1/4">
              <Postcards post={post} />
            </div>
          ))}
          {posts.length === 0 && <p>No posts found.</p>}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
