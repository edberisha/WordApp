// hooks/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {auth} from '../firebase/firebaseConfig'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, loginWithEmail, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
