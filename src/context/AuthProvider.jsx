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

  const registerUserWithEmail = (email, password) => {
    setIsAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUserWithEmail = (email, password) => {
    setIsAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setIsAuthLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const logoutUser = () => {
    setIsAuthLoading(true);
    return signOut(auth);
  };

  const updateUserDetails = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser?.email) {
        setUser(currentUser);
      } else {
        setUser(null);
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
