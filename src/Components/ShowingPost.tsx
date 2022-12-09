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
    <div className='grid-item'>
      {/* <div className='headerPost'>
        <p>{username}</p>
        <Button
          className=''
          onClick={() => {
            handleDeletePost(id);
          }}
        >
          Delete 
        </Button>
      </div> */}

      <img src={imgUrl} />

      <div className='footerPost'>{texts}</div>
    </div>
  );
};
