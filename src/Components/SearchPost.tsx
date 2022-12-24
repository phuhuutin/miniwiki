import React from "react";
import { Post } from "../Models/Post";
import { Link } from "react-router-dom";
type SearchPostProps = {
  post: Post;
};
export const SearchPost = ({
  post: { id, username, title, texts, imgUrl, likeCount },
}: SearchPostProps) => {
  return (
    <Link to={`/post/${id}`}>
      <div className='flex flex-col w-full items-center bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        <img
          className='object-cover  h-96  rounded-t-lg  md:w-4/6 sm:w-full  md:rounded-none md:rounded-l-lg'
          src={imgUrl}
          alt=''
        />
        <div className='flex flex-col   justify-between p-4 leading-normal md:w-2/6 sm:w-full  '>
          <h5 className='mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white'>
            {title}
          </h5>
          <div className=''>
            <p className='mb-3 font-normal  text-gray-700 dark:text-gray-400 '>
              {texts}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
