import React from "react";
import { useState, useEffect } from "react";
import { Container, Postcards } from "../components";
import postService from "../services/postService";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postService.list({ status: "active" }).then((data) => {
      if (data) setPosts(data);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.id} className="p-2 w-1/4">
              <Postcards {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
