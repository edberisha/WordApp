import { useEffect, useState } from "react";
import { auth, provider } from '../../src/firebase/firebaseConfig'
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
    console.log('Adding user to database:', { firebase_uid, email }); // Log here
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
      await addUserToDatabase(userCredential.user.uid, userCredential.user.email);
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
      const { uid, email } = result.user;
  
      console.log('Google User Credential:', result.user); // Check this log
  
      setUserId(uid);
      await addUserToDatabase(uid, email); // Ensure email is not undefined
      return result.user;
    } catch (error) {
      setError(error.message);
      console.error('Google login error:', error);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
      await signOut(auth);
      setUserId(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { userId, error, loginWithEmail, loginWithGoogle, logout };
};

export default useAuth;
