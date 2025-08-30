import React, { useState } from 'react'
import PostHeader from './PostHeader'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import Comment from './Comment';
import { createCommentApi } from '../services/PostService';
import CreatePost from './CreatePost';
import CommentForm from './CommentForm';


export default function PostCard({isProfilePage, post , commentlimit ,callback , callUserPost}) {

  const [allComments, setAllComments] = useState(post.comments)
  const [isUpdating, setIsUpdating] = useState(false)


    
  
  return <>
  
    {isUpdating ? <CreatePost isProfilePage={isProfilePage} setIsUpdating={setIsUpdating} isUpdating={isUpdating} postbody={post.body} postimg={post.image} postid={post._id} callUserPost={callUserPost} callback={callback} /> : <>
    
    
        <div className="bg-white  sm:w-170 rounded-md shadow-md h-auto py-3 px-3 my-5 mx-auto overflow-hidden">
    <PostHeader setIsUpdating={setIsUpdating} isProfilePage={isProfilePage} postId={post._id} postUserId={post.user._id} userimg={post.user.photo} username={post.user.name} date={post.createdAt} callback={callback} callUserPost={callUserPost} />
    <PostBody postbody={post.body} postimg={post.image} />
    <PostFooter postid={post._id} comments={allComments}/>

      <div className="grid grid-cols-3 w-full px-5 border-t border-divider pt-4  my-3">
        <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
          <span className="font-semibold text-lg text-gray-600">Like</span></button>
        <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          <span className="font-semibold text-lg text-gray-600">Comment</span></button>
        <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          <span className="font-semibold text-lg text-gray-600">Share</span></button>
      </div>

      <CommentForm postId={post._id} setAllComments={setAllComments}/>

      {allComments.length > 0 && allComments.slice(0,commentlimit).map((comment)=> <Comment setAllComments={setAllComments} postId={post._id} comment={comment} key={comment._id} /> ) }

  </div>

    
    </>}



  
  </>
}
