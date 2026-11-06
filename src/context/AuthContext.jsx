
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

import {
  signup as firebaseSignup,
  login as firebaseLogin,
  logout as firebaseLogout
} from "../Services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (username, password) => {
    const newUser = await firebaseSignup(username, password);
    setUser(newUser);
    return newUser;
  };

  const login = async (username, password) => {
    const loggedInUser = await firebaseLogin(username, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
