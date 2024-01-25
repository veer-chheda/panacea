import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password, role) => {
    const authUser = await createUserWithEmailAndPassword(auth, email, password);

    // Determine the user's role and create a document in the corresponding Firestore collection
    const db = getFirestore();
    const userCollection = role === 'doctor' ? 'doctors' : 'patients';

    try {
      await addDoc(collection(db, userCollection), {
        uid: authUser.user.uid,
        email: authUser.user.email,
        // Add additional fields if needed
      });
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      // Handle error as needed
    }

    return authUser;
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
