import React, { useEffect, useState } from "react";
import { SearchPost } from "./SearchPost";
import { Post } from "../Models/Post";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "./Pagination";
export const SearchPostPage = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sizeOfEachPage: number = 3;
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const baseUrl: string = "http://localhost:8081/api/posts/getAll";
      let url: string = `${baseUrl}?page=${
        currentPage - 1
      }&size=${sizeOfEachPage}`;
      if (searchUrl !== "") {
        url = baseUrl + searchUrl;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      const responseData = responseJson.content;
      const loadedPosts: Post[] = [];
      console.log(responseJson);
      setTotalPages(responseJson.totalPages);
      setTotalElements(responseJson.totalElements);
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

    fetchPosts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [searchUrl, currentPage]);
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

  const paginate = (thepage: number) => {
    setCurrentPage(thepage);
  };

  const searchHandleChange = (event: any) => {
    event.preventDefault();
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContainingOrderByPostdateDesc?title=${search}&page=0&size=${sizeOfEachPage}`
      );
    }
  };
  return (
    <div className='w-4/5 mx-auto w-90'>
      <div className='grid gird-row-2'>
        <div className='flex'>
          <form className='flex items-cente w-4/6 my-5 '>
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
                    fill-rule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='simple-search'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search'
                required
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={(e) => {
                searchHandleChange(e);
                setCurrentPage(1);
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
              <span className='sr-only'>Search</span>
            </button>
          </form>
        </div>
      </div>
      {totalElements >= 1 ? (
        <>
          <div className=''>
            <h5>Number of results: ({totalElements})</h5>
          </div>
          <p>
            {sizeOfEachPage * currentPage - sizeOfEachPage + 1} to{" "}
            {currentPage >= totalPages
              ? totalElements
              : sizeOfEachPage * currentPage}{" "}
            of {totalElements} items:
          </p>
        </>
      ) : (
        <>
          <div className=''>
            <h5>Can't find what you are looking for! </h5>
          </div>
        </>
      )}
      <div className='flex flex-col h-auto'>
        {posts?.map((post) => (
          <SearchPost key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};
