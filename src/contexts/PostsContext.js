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
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useAuth } from "./AuthContext";

const PostsContext = React.createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function PostsProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ description: "" });
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [cities, setCities] = useState([
    { name: "Amsterdam", id: "amsterdam" },
    { name: "London", id: "london" },
    { name: "Stockholm", id: "stockholm" },
    { name: "Tel Aviv", id: "telaviv" },
  ]);

  useEffect(()=>setFilter({location:""}),[])

  const [filter, setFilter] = useState({location:""});
  const [location,setLocation] = useState(filter.location)

  useEffect(()=>{
    setLocation(filter.location)
  },[filter])
  

  const postsCollection = collection(db, "posts");

  async function createNewPost() {
    console.log("newPost", newPost);
    await addDoc(postsCollection, {
      ...newPost,
      time: serverTimestamp(),
      userId: currentUser.uid,
      userEmail: currentUser.email,
    });
  }

  async function getCurrentUserPosts() {
    const q = query(postsCollection, "userId", "===", currentUser.uid);
  }

  async function getAllPosts() {

    const q = query(postsCollection, where("userId", "!=", "-1"));
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });
   
    setPosts([...postsArray]);
  }



  async function getFilteredPosts() {

    // ((filter.intrest !== "")??(where("intrest", "==", filter.intrest)):())


    const q = query(postsCollection, where("city", "==", filter.location),where("intrest", "==", filter.intrest));
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });
   console.log("postsArray",postsArray);
    setFilteredPosts([...postsArray]);
  }

  useEffect(() => {}, []);

  const value = {
    createNewPost,
    newPost,
    setNewPost,
    getAllPosts,
    posts,
    cities,
    filter, 
    setFilter,
    filteredPosts,
    setFilter,
    getFilteredPosts
  };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}
