import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";
import Stack from "react-bootstrap/esm/Stack";
import { Post, PostProps } from "./Type";
export const ShowingPost: React.FC<{
  post: Post;
  handleDeletePost: (id: number) => void;
}> = ({
  post: { id, username, title, texts, imgUrl, likeCount },
  handleDeletePost,
}: PostProps) => {
  return (
    <div className=' w-full h-full'>
      <div className=' m-2 p-2 h-full'>
        <div className='flex items-center justify-between shadow'>
          <span>{username}</span>

          <Button
            className=''
            onClick={() => {
              handleDeletePost(id);
            }}
          >
            Delete
          </Button>
        </div>
        <div className='h-4/6 shadow '>
          <img
            className='object-contain h-full shadow mx-auto my-auto'
            src={imgUrl}
          ></img>
        </div>
        <div className='h-1/6 shadow '>
          <p className=' '>{title}</p>
        </div>
      </div>
    </div>
  );
};
