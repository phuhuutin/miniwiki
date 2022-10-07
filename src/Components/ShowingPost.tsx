import React from "react";
import { PostProps } from "./Type";
export const ShowingPost = ({
  post: { id, username, title, texts, imgUrl, likeCount },
  handleDeletePost,
}: PostProps) => {
  return (
    <div>
      <div className='headerPost'>
        <p>{username}</p>
        <button
          onClick={() => {
            handleDeletePost(id);
          }}
        >
          Delete
        </button>
      </div>
      <div className='bodyPost'>{imgUrl}</div>
      <div className='footerPost'>{texts}</div>
    </div>
  );
};
