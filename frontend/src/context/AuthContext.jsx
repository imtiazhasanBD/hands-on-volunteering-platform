import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../utils/api"; // Import the getProfile function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (newToken) => {
    if (!newToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profileData = await getProfile(newToken);
      setUser(profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
    }
    setLoading(false);
  };

  // Run once when the component mounts
  useEffect(() => {
    fetchProfile(token);
  }, []);

  // Function to log in user and update token
  const loginUser = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchProfile(newToken); // ✅ Fetch user immediately
  };

  // Function to log out user
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
