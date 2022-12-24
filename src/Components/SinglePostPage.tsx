import React, { useEffect, useState } from "react";
import { Post } from "../Models/Post";

export const SinglePostPage = () => {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const postId = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchPosts = async () => {
      const baseUrl: string = `http://localhost:8081/api/posts/${postId}`;

      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();

      const loadedPost: Post = {
        id: responseJson.id,
        username: responseJson.userId,
        title: responseJson.title,
        texts: responseJson.body,
        imgUrl: responseJson.imgUrl,
        likeCount: 0,
      };
      setPost(loadedPost);
      setIsLoading(false);
    };

    fetchPosts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  return (
    <>
      <h5>Hello, its {post?.title}</h5>
    </>
  );
};
