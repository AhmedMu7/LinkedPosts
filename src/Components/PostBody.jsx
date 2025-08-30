import { Modal, ModalBody, ModalContent, useDisclosure } from '@heroui/react'
import React, { useState } from 'react'

export default function PostBody({postbody,postimg}) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [updatedbody, setUpdatedbody] = useState(postbody)


  return <>

        

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
              
                <img className='w-full' src={postimg} alt="" />
              
        </ModalContent>
      </Modal>
  
  {postbody && <p className=' mb-4'>{postbody}</p>}
  {postimg && <img onClick={onOpen} className='w-full h-96 object-cover hover:cursor-pointer' src={postimg} alt="" />}
  
  </>
}
