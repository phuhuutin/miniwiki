import React, { useState } from "react";

export const Navbar: React.FC<{}> = () => {
  const [login, setLogin] = useState(true);

  return (
    <nav className=' shadow bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <a href='#' className='flex items-center'>
          <img
            src='https://images.theconversation.com/files/237977/original/file-20180925-149955-r3w501.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip'
            className='h-6 mr-3 sm:h-9'
            alt='Logo'
          />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            MikiWiki
          </span>
        </a>
        <div className='flex '>
          {!login ? (
            <button
              type='button'
              className='text-white bg-slate-500 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0'
            >
              Login
            </button>
          ) : (
            <>
              <a
                href='#'
                className='block py-2 pr-3 self-center  text-lg font-semibold whitespace-nowrap '
                aria-current='page'
              >
                My Profile
              </a>
              <button
                type='button'
                className='text-white bg-slate-500 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0'
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
