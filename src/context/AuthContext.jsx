import React, { createContext, useState, useContext, useEffect } from "react";
import { customAuth } from "../lib/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const currentUser = customAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signUp = async (username, password) => {
    const result = await customAuth.signUp(username, password);
    if (result.user) {
      setUser({
        id: result.user.id,
        username: result.user.username,
      });
    }
    return result;
  };

  const signIn = async (username, password) => {
    const result = await customAuth.signIn(username, password);
    if (result.user) {
      setUser({
        id: result.user.id,
        username: result.user.username,
      });
    }
    return result;
  };

  const signOut = () => {
    customAuth.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
