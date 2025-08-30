import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import FeedPage from './Pages/FeedPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProfilePage from './Pages/ProfilePage'
import PostDetailsPage from './Pages/PostDetailsPage'
import NotfoundPage from './Pages/NotfoundPage'
import AuthLayout from './Layouts/AuthLayout'
import ProtectedRoute from './Components/ProtectedRoute'
import AuthProtectedRoute from './Components/AuthProtectedRoute'


const routers = createBrowserRouter ([

  {path : '', element : <MainLayout/> , children:[
    {index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><ProfilePage/></ProtectedRoute>},
    {path:'postdetails/:id',element:<ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
    {path:'*',element:<ProtectedRoute><NotfoundPage/></ProtectedRoute>},
  ]},

  {path : '' , element : <AuthLayout/> , children:[
    {path:'login' , element : <AuthProtectedRoute><Login/></AuthProtectedRoute>},
    {path:'register' , element : <AuthProtectedRoute><Register/></AuthProtectedRoute>},
  ]}

])

export default function App() {


  return <>
  
        <RouterProvider router={routers} ></RouterProvider>

  </>
}
