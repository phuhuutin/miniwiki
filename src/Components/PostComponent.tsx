import React, { useEffect, useState } from "react";

import { ShowingPost } from "./ShowingPost";
import { Post } from "../Models/Post";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PostComponent = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const baseUrl: string = "http://localhost:8081/api/posts";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.posts;
      const loadedPosts: Post[] = [];

      for (const key in responseData) {
        loadedPosts.push({
          id: responseData[key].id,
          username: responseData[key].userId,
          title: responseData[key].title,
          texts: responseData[key].body,
          imgUrl: responseData[key].imgUrl,
          likeCount: 0,
        });
      }

      setPosts(loadedPosts);
      setIsLoading(false);
    };

    fetchPosts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const handleDeletePost = (id: number): void => {
    const updatedPosts = posts?.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className='  my-5 mx-auto'>
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <>
      <>
        <div className='grid grid-cols-3 gap-4'>
          {posts?.map((post) => (
            <ShowingPost
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </div>
      </>
    </>
  );
};
