import React, { useContext, useState } from "react";
import Postheader from "./PostHeader";
import { AuthContext } from "../Context/AuthContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import CommentForm from "./CommentForm";
import { deleteCommentApi, getPostComments } from "../services/PostService";

export default function Comment({setAllComments, comment , postId}) {
  const {Profiledata} = useContext(AuthContext)
  const [isUpdating, setIsUpdating] = useState(false)


  async function deleteComment(){

    const response = await deleteCommentApi(comment._id)

    
    if(response.message){

      const data = await getPostComments(postId)
      setAllComments(data.comments)

    }


  }



  return (
    <>
      <div className="p-3 bg-gray-300 -mb-3 -mx-3 ">
        <div className="flex">

        <Postheader
          userimg={comment.commentCreator.photo}
          username={comment.commentCreator.name}
          date={comment.createdAt}
        />
        {Profiledata._id === comment.commentCreator._id && <Dropdown>
          <DropdownTrigger>
            <svg
              className=" w-10 outline-0 hover:cursor-pointer "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth={2}
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onPress={()=>setIsUpdating(true)} >Update</DropdownItem>
            <DropdownItem onPress={deleteComment} color="danger" >Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown> }

        </div>

        {isUpdating ? <CommentForm setAllComments={setAllComments} postId={postId} setIsUpdating={setIsUpdating} isUpdating={isUpdating} commentcontent={comment.content} commentId={comment._id}/> : <p className=" ps-13"> {comment.content} </p>}
        
      </div>
    </>
  );
}
