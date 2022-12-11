import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";
import Stack from "react-bootstrap/esm/Stack";
import { PostProps } from "./Type";
export const ShowingPost = ({
  post: { id, username, title, texts, imgUrl, likeCount },
  handleDeletePost,
}: PostProps) => {
  return (
    <div className=' w-2/6 '>
      <div className='shadow m-2 p-2 h-auto'>
        <div className='flex items-center justify-between'>
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

        <img className=' 	 ' src={imgUrl} />

        <p className='truncate'> {title}</p>
      </div>
    </div>
  );
};
