import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../services/PostService'
import PostCard from '../Components/Postcard'
import LoadingScreen from '../Components/LoadingScreen'

export default function PostDetailsPage() {


  let {id} = useParams()
  const [Post, setPost] = useState(null)

  async function getPostId(){


    const response = await getSinglePostApi(id);

    if(response.message){

      setPost(response.post)

    }

  }


  useEffect(()=>{

    getPostId()


  },[])


  return <>
  
    {Post ? <PostCard  post={Post} commentlimit={Post.comments.length} /> : <LoadingScreen/>}
  
  </>
}
