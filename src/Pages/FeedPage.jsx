import React, { use, useEffect, useState } from "react";
import { createPostApi, getPosts } from "../services/PostService";
import PostCard from '../Components/Postcard'
import LoadingScreen from "../Components/LoadingScreen";
import { useGet } from "../Hooks/useGet";
import { Button, Pagination } from "@heroui/react";
import { div } from "framer-motion/client";
import CreatePost from "../Components/CreatePost";

export default function FeedPage() {
  const [Posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1)

  
  

  async function getallposts() {
    setIsLoading(true)
    const response = await getPosts(page) 
    if(response.message){

      setPosts(response.posts);
      
    }   
    setIsLoading(false);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    getallposts();
  }, [page]);







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

      
      <div className="flex justify-center my-10">

        <Pagination className="hover:cursor-pointer"  showControls initialPage={1} total={23} onChange={(newPage) => setPage(newPage)} />
          
      </div>



    </>
  );
}
