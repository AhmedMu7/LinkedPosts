import { createContext, useState } from "react";
import { getProfileData } from "../services/ProfileService";
import { useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("token") != null
  );
  const [Profiledata, setProfiledata] = useState(null);

  async function getUserDate() {
    try {
      const response = await getProfileData();
      if (response.message) {
        setProfiledata(response.user);
      }
    } catch (err) {
      console.error("Failed to fetch profile data", err);
      setIsLoggedin(false);
    }
  }

  useEffect(() => {
    if (isLoggedin && !Profiledata) {
      getUserDate();
    }
  }, [isLoggedin]);

  return (
    <AuthContext.Provider
      value={{ isLoggedin, setIsLoggedin, Profiledata, setProfiledata }}
    >
      {children}
    </AuthContext.Provider>
  );
}
