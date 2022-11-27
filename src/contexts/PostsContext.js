import React, { useCallback, useContext, useEffect, useState } from "react";
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

const postsCollection = collection(db, "posts");
const usersCollection = collection(db, "users");

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
    { name: "All", id: "all" },
  ]);

  useEffect(() => setFilter({ location: "", intrest: "" }), []);

  const [filter, setFilter] = useState({ location: "", intrest: "" });
  const [location, setLocation] = useState(filter.location);

  useEffect(() => {
    setLocation(filter.location);
  }, [filter]);



  async function createNewPost() {
    getCurrentUserInfo();
    // console.log("userInfo", userInfo);
    await addDoc(postsCollection, {
      ...newPost,
      time: serverTimestamp(),
      userId: currentUser.uid,
      userEmail: currentUser.email,
    });
  }

  async function getCurrentUserPosts() {
    const q = query(postsCollection, "userId", "==", currentUser.uid);
  }
  async function getCurrentUserInfo() {
    const q = query(usersCollection, "userId", "==", currentUser.uid);
    const docSnap = await getDocs(q);
    console.log("info", docSnap);
    return docSnap;
  }
  const getAllPosts = useCallback( async () => {
    const q = query(postsCollection);
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });

    setPosts([...postsArray]);
  },[]);


  const getFilteredPosts = useCallback( async () =>
   {
    // ((filter.intrest !== "")??(where("intrest", "==", filter.intrest)):())
    const postsCollection = collection(db, "posts");
    let q;
    console.log("filter", filter);
    if (filter.location) {
      console.log("location");
      q = query(postsCollection, where("city", "==", filter.location));
    }
    if (filter.intrest) {
      console.log("intrest");
      q = query(postsCollection, where("intrest", "==", filter.intrest));
    }
    if (filter.location && filter.intrest) {
      console.log("intrest%location");
      q = query(
        postsCollection,
        where("city", "==", filter.location),
        where("intrest", "==", filter.intrest)
      );
    }

    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });
    console.log("postsArray", postsArray);
    setFilteredPosts([...postsArray]);
  },[filter])

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
    getFilteredPosts,
    getCurrentUserPosts,
  };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}
