import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
export const Navbar: React.FC<{}> = () => {
  const handleLogout = async () => null;
  return (
    <nav className=' shadow bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <NavLink className='flex items-center' to={"/home"}>
          {/* <img
            src='https://images.theconversation.com/files/237977/original/file-20180925-149955-r3w501.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip'
            className='h-6 mr-3 sm:h-9'
            alt='Logo'
          /> */}
          <span className='h-6 w-3 mr-3 sm:h-9 bg-pink-400' />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            MikiWiki
          </span>
        </NavLink>
        <div className='flex '>
          <NavLink
            to='/browse'
            className='block py-2 pr-3 self-center  text-md font-semibold whitespace-nowrap '
            aria-current='page'
          >
            Search
          </NavLink>
          {true ? (
            <Link
              to='/'
              type='button'
              className='btn focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0'
              // onClick={() => {
              //   UserService.doLogin();
              // }}
            >
              Login
            </Link>
          ) : (
            <>
              <a
                href='#'
                className='block py-2 pr-3 self-center  text-md font-semibold whitespace-nowrap '
                aria-current='page'
              >
                My Profile
              </a>
              <button
                type='button'
                className=' btn focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0'
                onClick={handleLogout}
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
