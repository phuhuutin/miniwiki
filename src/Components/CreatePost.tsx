import React, { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Post } from "../Models/Post";
import { Button, Card, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
type CreateProps = {
  handleAdding: (thepost: Post) => void;
};
export const CreatePost = ({ handleAdding }: CreateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPost, setCurrentPost] = useState<Post>();
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    if (currentPost) handleAdding(currentPost);
    console.log(currentPost);
  }, [currentPost]);

  const callAPIs = async () => {
    if (search == "" || search === undefined) {
    } else {
      const wikiData: [string, string] = await wikiAPI();
      const imgUrl: string = await imgAPI();
      const thePost: Post = {
        id: Math.random() * 10000,
        title: wikiData[0],
        texts: wikiData[1],
        imgUrl: imgUrl,
        username: "unknown",
        likeCount: 0,
      };
      setCurrentPost(thePost);
      console.log(currentPost);
    }
  };

  const wikiAPI = async (): Promise<[string, string]> => {
    setIsLoading(true);
    let url: string = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&utf8=&format=json&origin=*`;
    console.log(url);
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const responseJson = await response.json();
    const responseData = responseJson.query.search[0].snippet;
    const responseTitle = responseJson.query.search[0].title;
    let div = document.createElement("div");
    div.innerHTML = responseData;
    var text = div.textContent || div.innerText || "";
    console.log(text);
    setIsLoading(false);
    return [responseTitle, text];
  };

  const imgAPI = async (): Promise<string> => {
    setIsLoading(true);
    let url: string = `https://api.unsplash.com/search/photos?client_id=e1n6ZwrihmcZJW0Ehu6Wu8DCPB6pL9hPwyqVzflGEqE&page=1&query=${search}`;
    const response = await fetch(url);
    console.log(url);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const responseJson = await response.json();
    const random = Math.floor(Math.random() * 11);
    console.log(responseJson);
    const responseData = responseJson.results[random].urls.regular;
    console.log(responseData);
    setIsLoading(false);
    return responseData;
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className=' my-5 mx-auto'>
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      {/*  */}
      <Card className='w-[96%] mx-auto m-3 p-0'>
        <div className='flex items-center '>
          <div className='w-4/5'>
            <h5 className='mb-2 text-3xl font-bold text-gray-900 dark:text-white'>
              Search Faster with MiniWiki
            </h5>
            <p className='mb-5 text-base dark:text-gray-400 sm:text-lg'>
              MiniWiki is built using Wikipedia API which helps return the most
              accurate information.
            </p>
            <div className='items-center  mr-4  sm:space-y-0 sm:space-x-4 w-100'>
              <form className='flex items-center  my-1 '>
                <label className='sr-only'>Search</label>
                <div className='relative w-full'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5 text-gray-500 dark:text-gray-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                  <input
                    type='text'
                    id='simple-search'
                    className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Search'
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  type='submit'
                  className=' rounded-lg btn p-2.5 ml-2 text-sm font-medium text-white'
                  onClick={(e) => {
                    e.preventDefault();
                    callAPIs().catch((error: any) => {
                      setIsLoading(false);
                      setHttpError(error.message);
                    });
                    setIsModalShow(true);
                  }}
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    ></path>
                  </svg>
                  <span className='sr-only'>Search</span>
                </button>
              </form>
            </div>
          </div>
          <div className='w-2/5 bg-pink-100 p-5'>
            <h5 className='mb-2 text-3xl font-bold text-gray-900'>
              Are you New ?
            </h5>
            <p className='mb-5 text-base dark:text-gray-400 sm:text-lg '>
              Please Sign Up or Login to save cards you find in your profile
            </p>
            <Link
              to='/login'
              type='button'
              className='btn focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0'
            >
              Login
            </Link>
          </div>
        </div>
      </Card>
      <Modal
        show={isModalShow}
        size='6xl'
        onClose={() => setIsModalShow(false)}
        className='max-h-fit'
      >
        <Modal.Header>{currentPost?.title}</Modal.Header>
        <Modal.Body className=''>
          {currentPost &&
          currentPost?.title != "" &&
          currentPost?.texts != "" ? (
            <div className=''>
              <div className='space-y-6'>
                <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                  {currentPost?.texts}
                </p>
              </div>
              <img className='h-80 mx-auto' src={currentPost?.imgUrl} />
            </div>
          ) : (
            <SpinnerLoading />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button>I accept</Button>
          <Button color='gray'>Decline</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
