import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";


import { Post } from "../Models/Post";
import { Button, Card, Modal } from "flowbite-react";
import { text } from "stream/consumers";
import { getSession, isLoggedIn } from "../LocalSession";
import { NavLink } from "react-router-dom";
import { WikiLogin } from "./WikiLogin";

type PostProps = {
  post: Post;
  // handleAddPost: (id: number) => void;
};

export const ShowingPostToAdd = ({
  post: {title, texts, imgUrl},

}: PostProps) => {
    const {email, accessToken, username} = getSession();
    const [showAddingModal, setShowAddingModal] = useState(false);
    const handleAddPost = ()=>{
        const addPostUrl: string = 'http://localhost:8081/api/posts/postPost';
        console.log({title: title, body: texts, imgUrl: imgUrl, userEmail: email});
        fetch(addPostUrl, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title: title, body: texts, imgUrl: imgUrl, userEmail: email})
          
        }).then(()=>{
          console.log("succesfully post");
        }).catch(()=>{
          console.log("unsuccesfully post");
        })

        setShowAddingModal(false);


    }

     


    return (
      <>
       
        <div className='w-full md:h-[450px] sm:h-[600px] 2xl:h-[600px]' onClick={()=>{setShowAddingModal(true)}}>
          
          <div className='m-5'>
            <div className="flex flex-row justify-between">
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {title}
              </h5>
               
             

            </div>
            
           
            <p className='font-normal text-gray-700 dark:text-gray-400'>{texts}</p>
          </div>
          
          <img
            className=' w-full md:h-[450px] sm:h-[550px] 2xl:h-[550px] my-auto object-cover  '
            src={imgUrl}
          />
        </div>
        <Modal
          show={showAddingModal}
          size="md"
          popup={true}
          onClose={()=>{setShowAddingModal(false)}}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Do you want to add "{title}"" card to your profile's collection ?
                </h3>
                <div className="flex justify-center gap-4">
                  {isLoggedIn()?
                    <Button onClick={handleAddPost}>Yes</Button> : 
                    <WikiLogin />
                  }
                  <Button
                    color="gray"
                    onClick={()=>{setShowAddingModal(false)}}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
        </Modal>
        </>
      );
};

