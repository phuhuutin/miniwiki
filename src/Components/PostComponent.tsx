import React, { useEffect, useState } from "react";
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
    <div className='postContainer'>
      {posts?.map((post) => (
        <ShowingPost
          key={post.id}
          post={post}
          handleDeletePost={handleDeletePost}
        />
      ))}
    </div>
  );
};
