import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { ShowingPost } from "./ShowingPost";

import { data, Post } from "./Type";
export const PostComponent: React.FC<{}> = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [singlePost, setSinglePost] = useState<Post>();

  useEffect(() => {
    setPosts(data);
  }, []);

  const handleDeletePost = (id: number): void => {
    const updatedPosts = posts?.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <>
      <div className='h-auto'>
        <div className='flex flex-wrap flex-row h-auto'>
          {posts?.map((post) => (
            <ShowingPost
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </div>
      </div>
    </>
  );
};
