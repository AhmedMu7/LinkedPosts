import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function MainLayout() {
  

  



  return <>
  
        <main >
            <Navbar />

                <div className=' bg-gray-200 py-4 min-h-screen'>
                  <Outlet/>
                </div>
                
            <Footer/>
        </main>

  </>
}
