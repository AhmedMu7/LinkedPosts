import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfileData } from "../services/ProfileService";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  
  const {isLoggedin} = useContext(AuthContext)


  return isLoggedin ? children : <Navigate to={'/login'} />;
}
