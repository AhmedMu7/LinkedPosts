import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { createCommentApi, getPostComments, updateCommentApi } from '../services/PostService';

export default function CommentForm({setAllComments , postId , commentcontent ,isUpdating ,setIsUpdating , commentId}) {

    const [isLoading, setIsLoading] = useState(false)
    const [comment, setComment] = useState(commentcontent? commentcontent : '')
    
      async function createComment(e){
        e.preventDefault();
    
        setIsLoading(true)
        let response
        if(isUpdating){
            
         response = await updateCommentApi( comment , commentId )

        }
        else{

         response = await createCommentApi( comment , postId )

        }
        
        if(response.message){

            const data = await getPostComments(postId);           
            setAllComments(data.comments);
            setComment('');
            
        }
        setIsLoading(false)
        if(isUpdating){
            setIsUpdating(false)
        }
        
      }

      function checkCommentlength(){

    if(comment.length < 2){
      return true
    }

    else{
      return false
    }
  }
  return <>
  
  <form onSubmit={createComment} className='flex justify-between gap-3 mb-3' >

        <Input disabled={isLoading} value={comment} onChange={(e)=>setComment(e.target.value)}  placeholder='Comment...' />
        {isUpdating ? <Button disabled={checkCommentlength()}  isLoading={isLoading} type='submit' variant='ghost' color='primary' className=' outline-0' >Update</Button> : <Button disabled={checkCommentlength()}  isLoading={isLoading} type='submit' variant='ghost' color='primary' className=' outline-0' >Add Comment</Button>}
        {isUpdating && <Button color='warning' onPress={()=> setIsUpdating(false)}>cancel</Button>}

      </form>
  
  </>
}
