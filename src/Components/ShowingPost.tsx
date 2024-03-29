import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";
import Stack from "react-bootstrap/esm/Stack";
import { Post } from "../Models/Post";
import { Card } from "flowbite-react";
import { text } from "stream/consumers";

type PostProps = {
  post: Post;
 // handleDeletePost: (id: number) => void;
};

export const ShowingPost = ({
  post: { id, username, title, texts, imgUrl, likeCount },

}: PostProps) => {
  return (
    <div className='w-full md:h-[450px] sm:h-[600px] 2xl:h-[600px]'>
      <div className='m-5'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h5>
        <p className='font-normal text-gray-700 dark:text-gray-400'>{texts}</p>
      </div>
      <img
        className=' w-full md:h-[450px] sm:h-[550px] 2xl:h-[550px] my-auto object-cover  '
        src={imgUrl}
      />
    </div>

  );
};
