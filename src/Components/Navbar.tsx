import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { WikiLogin } from "./WikiLogin";
import { WikiUser } from "../Models/WikiUser";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "../Contexts/AuthContext";
import { endSession, getSession, isLoggedIn } from "../LocalSession";
export const Navbar: React.FC<{}> = () => {
  const {currentUser, signOutFirebase} = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [myUser, setMyUser] = useState<WikiUser>();
  const {email, accessToken, username} = getSession();
  const handleLogout = () => {
    signOutFirebase(auth)
      .then(() => {
        // Sign-out successful.

        navigate("/");
        console.log("Signed out successfully");
        endSession();
      })
      .catch((error: any) => {
        // An error happened.
      });
  };
  return (
    <nav className=' shadow bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <NavLink className='flex items-center' to={"/home"}>
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
          {!accessToken ? (
            <WikiLogin />
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
              {username != null ? <p>hello, {username}</p> : <></>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
