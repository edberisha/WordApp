import { useEffect, useState } from "react";
import { auth, provider } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addUserToDatabase = async (firebase_uid, email) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebase_uid, email }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
  
    return response.json();
  };
  
  const loginWithEmail = async (email, password) => {
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUserId(userCredential.user.uid);
      await addUserToDatabase(userCredential.user.uid, userCredential.user.email); // Include email
      return userCredential.user;
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      setUserId(result.user.uid);
      await addUserToDatabase(result.user.uid, result.user.email); // Include email
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserId(null); // Clear userId after logging out
    } catch (error) {
      console.error('Logout error:', error);x
    }
  };

  return { userId, error, loginWithEmail, loginWithGoogle, logout };
};

export default useAuth;
