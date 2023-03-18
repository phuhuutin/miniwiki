import { Button } from "flowbite-react";
import {useState } from "react"
import { getCurrentUserEmail, getCurrentUserToken } from "../LocalSession";
import { Comment } from "../Models/Comment";


type postCommentProps = {
    postId: string,
    handleAddComment: (newComment: Comment) => void
}

export const PostComment = ({postId, handleAddComment}:postCommentProps)=>{

    const [commentText, setCommentText] = useState("");


    

    const  handleAddCommentRequest = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const createCommentURL: string = `http://localhost:8081/api/comment/postComment`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCurrentUserToken()}`
        };

        const data = {
            body: commentText,
            userEmail: getCurrentUserEmail(),
            postId: postId
          };

        const body = JSON.stringify(data);

        event.preventDefault();
        if(commentText !== ""){
            fetch(createCommentURL, {
                method: 'POST',
                headers: headers,
                body: body
            }).then(response => {
                
                const data = response.json().then((data)=>{
                    console.log(data);
                    const newComent: Comment = {
                        id: data.id,
                        username: data.user.username,
                        body: data.body
                    }
                    handleAddComment(newComent)
                }
                )           
            })
            .catch(error => console.error(error));
        }
        setCommentText("");
    }

    return(
        <div className="flex ">
                <input
                    type='text'
                    value={commentText}
                    className='border-b pl-2 w-full p-0  border-gray-700   '
 
                    required
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="border border-black p-1 border-l-0" onClick={handleAddCommentRequest}>Comment</button>

        </div>
    )
}