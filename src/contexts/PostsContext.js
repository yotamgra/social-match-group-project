import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  getDoc,
  getDocs,
  where
} from "firebase/firestore";
import { async } from "@firebase/util";

const PostsContext = React.createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");

  

  async function createNewPost(newPost) {
    console.log("newPost", newPost);
    await addDoc(postsCollection, {
      description: newPost,
      time: serverTimestamp(),
      userId: currentUser.uid,
      userEmail: currentUser.email,
    });
 
  }

  async function getCurrentUserPosts() {
    const q = query(postsCollection, "userId", "===", currentUser.uid);
  }

  async function getAllPosts() {
    // const q = query(postsCollection, orderBy("time", "desc"));
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // });
    // return unsubscribe;
    const q = query(postsCollection, where("userId", "==", currentUser.uid));
    const docSnap = await getDocs(q)
    docSnap.forEach((doc) => {
      setPosts(doc.data());
    });
  }

  useEffect(() => {
  
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    createNewPost,
    newPost,
    setNewPost,
    getAllPosts,
    posts,
  };
  return (
    <PostsContext.Provider value={value}>
      {!loading && children}
    </PostsContext.Provider>
  );
}
