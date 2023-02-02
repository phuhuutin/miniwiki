import React, { useEffect, useState } from "react";
import { Post } from "../Models/Post";
import { Comment } from "../Models/Comment";
import { ShowingComment } from "./ShowingComment";

export const SinglePostPage = () => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const postId = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchPosts = async () => {
      const baseUrl: string = `http://localhost:8081/api/posts/getPostById?postId=${postId}`;

      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();

      const loadedPost: Post = {
        id: responseJson.id,
        username: responseJson.user.username,
        title: responseJson.title,
        texts: responseJson.body,
        imgUrl: responseJson.imgUrl,
        likeCount: 0,
      };

      const loadedComments: Comment[] = [];

      for (const key in responseJson.comment) {
        loadedComments.push({
          id: responseJson.comment[key].id,
          username: responseJson.comment[key].user.username,
          body: responseJson.comment[key].body,
        });
      }

      setPost(loadedPost);
      setIsLoading(false);
      setComments(loadedComments);

      console.log(comments);
    };

    fetchPosts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  return (
    <div className=' flex md:flex-row h-auto md:h-fit shadow flex-col '>
      <img
        className='w-2/3 h-screen   m-2 mx-auto object-contain border-solid shadow '
        src={post?.imgUrl}
        alt={post?.title}
      />
      <div className=' flex flex-col h-auto m-2 rounded-md border-indigo-600 shadow p-3'>
        <div className='flex justify-between'>
          <h2 className='pb-2 text-lg'>{post?.title}</h2>
          <p className='pb-2'>{post?.username}</p>
        </div>
        <div className=' '>
          <p className='pb-2 '>{post?.texts}</p>
        </div>

        <div className='m-1 flex justify-around border-solid border-y-2'>
          <div className='flex mr-2 text-gray-700 text-sm mr-3'>
            <svg
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 mr-1'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            <span>{post?.likeCount}</span>
          </div>
          <div className='flex mr-2 text-gray-700 text-sm mr-8'>
            <svg
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 mr-1'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
              />
            </svg>
            <span>{comments?.length}</span>
          </div>
          <div className='flex mr-2 text-gray-700 text-sm mr-4'>
            <svg
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 mr-1'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
              />
            </svg>
            <span>share</span>
          </div>
        </div>
        {comments?.map((comment) => (
          <ShowingComment
            key={comment.id}
            id={comment.id}
            username={comment.username}
            body={comment.body}
          />
        ))}
      </div>
    </div>
  );
};
