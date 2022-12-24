import React from "react";

export const FooterComponent = () => {
  return (
    <footer className=' p-4  flex-row flex flex-wrap items-center justify-between g-white rounded-lg shadow mx-0 bg-gray-100'>
      <p className=' text-sm basis-1/4'>
        © 2022 WiniWiki™. No Rights Reserved.{" "}
      </p>
      <ul className='flex flex-wrap items center  text-sm '>
        <li>
          <a href='#' className='mr-4 hover:underline md:mr-6 '>
            About
          </a>
        </li>
        <li>
          <a href='#' className='mr-4 hover:underline md:mr-6'>
            Privacy Policy
          </a>
        </li>
        <li>
          <a href='#' className='mr-4 hover:underline md:mr-6'>
            Licensing
          </a>
        </li>
        <li>
          <a href='#' className='hover:underline'>
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};
