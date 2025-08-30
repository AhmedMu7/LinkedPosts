import React, { useContext, useState } from "react";
import imgPlaceHolder from "../assets/Portrait_Placeholder.png";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { AuthContext } from "../Context/AuthContext";
import { deletePostsApi } from "../services/PostService";

export default function Postheader({isProfilePage,setIsUpdating ,postId, postUserId , userimg, username, date , callback ,callUserPost }) {

  const {Profiledata} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(null)

  async function deletePost(){
    setIsLoading(true)
    
    const respose = await deletePostsApi(postId)
    
    if(respose.message){

      if(isProfilePage){

        await callUserPost()

      }

      else{

        await callback()

      }

    }
    setIsLoading(false)
  }

  return (
    <>
      <div className="w-full h-16 flex items-center justify-between ">
        <div className="flex">
          <img
            onError={(e) => (e.target.src = imgPlaceHolder)}
            className=" object-center rounded-full w-10 h-10 mr-3"
            src={userimg}
            alt=""
          />
          <div>
            <h3 className="text-md font-semibold ">{username}</h3>
            <p className="text-xs text-gray-500">
              {date.split(".", 1).join().replace("T", " ")}
            </p>
          </div>
        </div>

        {Profiledata._id === postUserId &&         <Dropdown>
          <DropdownTrigger>
            <svg
              className=" w-10 outline-0 hover:cursor-pointer"
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
            <DropdownItem onClick={()=>setIsUpdating(true)} >Update</DropdownItem>
            <DropdownItem onClick={deletePost} color="danger" >Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>}
      </div>
    </>
  );
}
