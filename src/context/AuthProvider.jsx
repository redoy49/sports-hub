import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Register new user
  const registerUserWithEmail = (email, password) => {
    setIsAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const loginUserWithEmail = (email, password) => {
    setIsAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login user with Google
  const loginWithGoogle = () => {
    setIsAuthLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  // Logout user
  const logoutUser = () => {
    setIsAuthLoading(true);
    return signOut(auth);
  };

  // Update user profile with name and photo
  const updateUserDetails = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth State Changed:', currentUser?.email);

      if (currentUser?.email) {
        setUser(currentUser);

        // Optional: Handle JWT or session cookie setup here
      } else {
        setUser(null);

        // Optional: Handle logout cleanup here
      }

      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const authData = {
    user,
    isAuthLoading,
    registerUserWithEmail,
    loginUserWithEmail,
    loginWithGoogle,
    logoutUser,
    updateUserDetails,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
