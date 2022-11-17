import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  async function signup(name, gender, email, phone, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setCurrentUser(userCredential.user);
    const collectionRef = collection(db, "users");

    console.log("gender", gender);
    await addDoc(collectionRef, {
      name,
      userId: userCredential.user.uid,
      gender,
      phone,
    });
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return await signOut(auth);
  }

  async function createNewPost(newPost){
    console.log("newPost",newPost);
    const postsCollection = collection(db, "posts");
    await addDoc(postsCollection, {
      newPost,
      time: serverTimestamp(),
      userId: currentUser.uid
    })
  }



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    createNewPost,
    newPost,
    setNewPost

  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
