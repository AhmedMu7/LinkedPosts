import React, { useEffect, useState } from "react";
import { createPostApi, getUserPostsApi, updatePostsApi } from "../services/PostService";
import { Button, Spinner } from "@heroui/react";
import { warning } from "framer-motion";

export default function CreatePost({setIsUpdating , isUpdating , postbody , postid , postimg , callback , callUserPost ,isProfilePage}) {
  const [postBody, setPostBody] = useState(postbody? postbody : '');
  const [postImage, setPostImage] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState(postimg? postimg : '');
  const [isLoading, setIsLoading] = useState(false)

  async function urlToFile(){

    if (!postimg) return;

    const response = await fetch(postimg)
    const data = response.blob()

    const img = new File([data] , 'image' , {type:'image/jpg'})
    setPostImage(img)

  }

  useEffect(()=>{

    urlToFile()

  },[])

  function handleImage(e) {
    setPostImage(e.target.files[0]);
    setPostImageUrl(URL.createObjectURL(e.target.files[0]));

    e.target.value = "";
  }

  
  async function createPost(e) {
      e.preventDefault();
      
    setIsLoading(true)
    const formdata = new FormData();
    postBody && formdata.append("body", postBody);
    postImage && formdata.append("image", postImage);

    let response;

    if(isUpdating){

      response = await updatePostsApi(formdata,postid);
      if (response.message) {
        if(isProfilePage){
          await callUserPost()
        }
        else{
          await callback()
        }
        setPostBody('');
        setPostImageUrl('');
    }
    }
    else{
      
      response = await createPostApi(formdata);
      if (response.message) {
        await callback();
        setPostBody('');
        setPostImageUrl('');
    }

    }
    
    

    if(isUpdating){

      setIsUpdating(false)

    }
    setIsLoading(false)

  }

  return (
    <>
      <form
        onSubmit={createPost}
        className=" relative bg-white sm:w-170 rounded-md shadow-md py-3 px-3 my-5 mx-auto overflow-hidden"
      >
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value) }
          className="w-full h-50 resize-none px-2 py-2 outline-0 bg-gray-100 mb-2"
          name=""
          id=""
          placeholder="What's on your mind..."
        ></textarea>

        {postImageUrl && (
          <div className=" relative">
            <svg
              onClick={() => {setPostImageUrl(""); setPostImage(null);}}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" hover:cursor-pointer  text-white absolute top-2 end-2 size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <img className="w-full mb-3" src={postImageUrl} alt="" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex w-fit space-x-1 hover:cursor-pointer">
            <input onChange={handleImage} type="file" className=" hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" hover:cursor-pointer size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className="block">Image</span>
          </label>

          <div className=" space-x-2">
            {isUpdating && <Button onPress={()=>setIsUpdating(false)} type="submit" variant="ghost" color="warning">
            cancel
          </Button>}
          

          <Button type="submit" variant="ghost" color="primary">
            Post
          </Button>
          </div>



        </div>

        {isLoading &&         <div className=" flex justify-center items-center absolute inset-0 bg-blue-500/15" >
            <Spinner/>
        </div> }

      </form>
    </>
  );
}
