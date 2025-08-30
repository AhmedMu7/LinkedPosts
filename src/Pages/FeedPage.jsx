import React, { use, useEffect, useState } from "react";
import { createPostApi, getPosts } from "../services/PostService";
import PostCard from '../Components/Postcard'
import LoadingScreen from "../Components/LoadingScreen";
import { useGet } from "../Hooks/useGet";
import { Button } from "@heroui/react";
import { div } from "framer-motion/client";
import CreatePost from "../Components/CreatePost";

export default function FeedPage() {
  const [Posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  

  async function getallposts() {
    const response = await getPosts()
    if(response.message){

      setPosts(response.posts);
      
    }   
    setIsLoading(false);
  }

  useEffect(() => {
    getallposts();
  }, []);







  return (
    <>
        

      {<CreatePost callback={getallposts} />}


      {isLoading ? (
        <>
          <LoadingScreen/>
        </>
      ) : (
        <>
          {Posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              commentlimit={1}
              callback={getallposts}
              isProfilePage={false}
            />
          ))}
        </>
      )}
    </>
  );
}
