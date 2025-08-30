import {
  Navbar as AppNavbar,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useContext } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {

    const {isLoggedin , setIsLoggedin ,setProfiledata} = useContext(AuthContext)
    const navigate = useNavigate()

  function logOut(){

    localStorage.removeItem('token');
    
    setIsLoggedin(null);
    setProfiledata(null);
  
    navigate('/login')

  }

  return (
    <>
      <AppNavbar position="static" className="bg-white py-2">
        <NavbarBrand>
          <NavLink className=" font-bold text-2xl">LinkedPosts</NavLink>
        </NavbarBrand>
        <NavbarContent justify="end">
          {isLoggedin ?
           <>
            <NavbarItem onClick={logOut} className="outline-2 p-2 rounded-xl 500 hover: cursor-pointer hover:bg-red-500 duration-200 hover:text-white text-red-500">
              Log out
            </NavbarItem>

          <NavbarItem className="outline-2 p-2 rounded-xl 500 hover: cursor-pointer hover:bg-blue-500 duration-200 hover:text-white text-blue-500">
            <NavLink to={"/profile"}>Profile</NavLink>
          </NavbarItem>

          
          </>

           : 
            <>
              <NavbarItem>
                <NavLink to={"/register"}> Register </NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={"/login"}> Login </NavLink>
              </NavbarItem>
            </>
} 

        </NavbarContent>
      </AppNavbar>
    </>
  );
}
