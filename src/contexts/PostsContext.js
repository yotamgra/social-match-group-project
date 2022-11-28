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
  const [filter, setFilter] = useState({ location: "", interest: "" });

  const [cities, setCities] = useState([
    { name: "Amsterdam", id: "amsterdam" },
    { name: "London", id: "london" },
    { name: "Stockholm", id: "stockholm" },
    { name: "Tel Aviv", id: "telaviv" },
    { name: "All", id: "all" },
  ]);

  useEffect(() => {}, [filter]);

  async function createNewPost() {
    // getCurrentUserPosts();
    const userInfo = await getCurrentUserInfo();
    try {
      console.log("userInfo", userInfo[0]);
    } catch (err) {
      console.log(err);
    }
    await addDoc(postsCollection, {
      ...newPost,
      time: serverTimestamp(),
      user: userInfo[0],
      
    });
  }

  async function getCurrentUserPosts() {
    const q = query(postsCollection, where("userId", "==", currentUser.uid));
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });
    console.log("user posts", postsArray);
  }

  const getCurrentUserInfo = useCallback(async () => {
    console.log("currentUser.uid", currentUser.uid);
    const q = query(usersCollection, where("userId", "==", currentUser.uid));
    const docSnap = await getDocs(q);
    const userArray = [];
    docSnap.forEach((doc) => {
      userArray.push(doc.data());
    });
    console.log("user ", userArray);

    return userArray;
  }, [currentUser]);

  const getAllPosts = useCallback(async () => {
    const q = query(postsCollection, orderBy("time", "desc"));
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });

    setPosts([...postsArray]);
  }, []);

  const getFilteredPosts = useCallback(async () => {
    let tempFilteredPosts = [...posts];
    console.log(posts);
    tempFilteredPosts = tempFilteredPosts.filter((post) =>
      (filter.location
        ? filter.location === "all" || filter.location === post.city
        : true) && (filter.interest ? filter.interest === post.interest : true)
    );

  
    setFilteredPosts([...tempFilteredPosts]);
  }, [filter, posts]);

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
    getFilteredPosts,
    getCurrentUserPosts,
  };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}
