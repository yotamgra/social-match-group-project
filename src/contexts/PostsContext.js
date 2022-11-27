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

  useEffect(() => setFilter({ location: "", interest: "" }), []);

  const [filter, setFilter] = useState({ location: "", interest: "" });

  useEffect(() => {}, [filter]);

  async function createNewPost() {
    const userInfo = await getCurrentUserInfo();
    console.log("userInfo", userInfo);
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

    const docRef = doc(db, "users", currentUser.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}



    // const q = query(usersCollection, where("userId", "==", currentUser.uid));
    // const docSnap = await getDoc(q);
    // console.log("info", docSnap);
    // return docSnap.data();
  }
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
      filter.location
        ? filter.location === "all" || filter.location === post.city
        : true
    );

    tempFilteredPosts = tempFilteredPosts.filter((post) =>
      filter.interest ? filter.interest === post.interest : true
    );
    setFilteredPosts([...tempFilteredPosts]);
  }, [filter, posts]);

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
