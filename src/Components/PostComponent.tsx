import React, { useEffect, useState } from "react";

import { ShowingPost } from "./ShowingPost";
import { Post } from "../Models/Post";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CreatePost } from "./CreatePost";
import { Carousel } from "flowbite-react";
import { data } from "./Type";

export const PostComponent = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [postCarousel, setPostCarousel] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setPostCarousel(data);

    const fetchPosts = async () => {
      const baseUrl: string = "http://localhost:8081/api/posts";
      const url: string = `${baseUrl}?page=0&size=6`;
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

    // fetchPosts().catch((error: any) => {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // });
    //console.log(authState);
  }, []);

  const handleAdding = (thePost: Post) => {
    let newPostArr: Post[] = [];
    newPostArr.push(thePost);
    posts?.map((thepost) => {
      newPostArr.push(thepost);
    });
    newPostArr.pop();
    setPosts(newPostArr);
  };

  const handleDeletePost = (id: number): void => {
    const updatedPosts = posts?.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // if (isLoading) {
  //   return <SpinnerLoading />;
  // }

  // if (httpError) {
  //   return (
  //     <div className='  my-5 mx-auto'>
  //       <p>{httpError}</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <>
        {/* <div className='flex flex-wrap flex-row'>
          {posts?.map((post) => (
            <ShowingPost
              key={post.id}
              post={post}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </div> */}

        <div className=' mx-auto w-[96%] shadow-lg'>
          <Carousel className='rounded-none'>
            {postCarousel?.map((post) => (
              <ShowingPost
                key={post.id}
                post={post}
                handleDeletePost={handleDeletePost}
              />
            ))}
          </Carousel>
        </div>

        <CreatePost handleAdding={handleAdding} />
      </>
    </>
  );
};
