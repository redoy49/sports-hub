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
import {auth} from '../firebase/firebase.config'
import { AuthContext } from './AuthContext';
// import axios from 'axios';

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Demo user
  const user = {
    name: 'Redoy Al Hasan',
    age: 23
  }

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
    const unsubscribe = onAuthStateChanged(auth, async user => {
      console.log('Auth State Changed:', user?.email);

      if (user?.email) {
        setCurrentUser(user);

        // try {
        //   await axios.post(
        //     `${import.meta.env.VITE_API_URL}/jwt`,
        //     { email: user.email },
        //     { withCredentials: true }
        //   );
        // } catch (error) {
        //   console.error('JWT Token Fetch Error:', error);
        // }
      } else {
        setCurrentUser(null);

        // try {
        //   await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        //     withCredentials: true,
        //   });
        // } catch (error) {
        //   console.error('Logout Cleanup Error:', error);
        // }
      }

      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const authData = {
    currentUser,
    isAuthLoading,
    registerUserWithEmail,
    loginUserWithEmail,
    loginWithGoogle,
    logoutUser,
    updateUserDetails,
    user
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
