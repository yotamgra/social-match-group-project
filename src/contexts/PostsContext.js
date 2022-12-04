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
  deleteDoc,
  setDoc,
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
  const intialNewPost = {
    title: "",
    description: "",
    spots: 15,
    city: "",
    date: "",
    level: "",
    interest: "",
    participants: [],
  };

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState({ ...intialNewPost });
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState({ location: "", interest: "" });
  const [changeInPosts, setChangeInPosts] = useState(false);
  const [editor, setEditor] = useState(false);
  const [editForm, setEditForm] = useState({ ...intialNewPost });
  const [cities, setCities] = useState([
    { name: "Amsterdam", id: "Amsterdam" },
    { name: "London", id: "London" },
    { name: "Stockholm", id: "Stockholm" },
    { name: "Tel Aviv", id: "Tel Aviv" },
    { name: "All", id: "All cities" },
  ]);

  useEffect(() => {}, [filter]);

  async function createNewPost() {
    // getCurrentUserPosts();
    const userInfo = await getCurrentUserInfo();
    try {
    } catch (err) {
      console.log(err);
    }
    await addDoc(postsCollection, {
      ...newPost,
      publishTime: serverTimestamp(),
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
  }

  const getCurrentUserInfo = useCallback(async () => {
    const q = query(usersCollection, where("userId", "==", currentUser.uid));
    const docSnap = await getDocs(q);
    const userArray = [];
    docSnap.forEach((doc) => {
      userArray.push(doc.data());
    });

    return userArray;
  }, [currentUser]);

  const getAllPosts = useCallback(async () => {
    const q = query(postsCollection, orderBy("publishTime", "desc"));
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push({ ...doc.data(), id: doc.id });
    });

    setPosts([...postsArray]);
  }, []);

  // DELETE
  const deleteUserPost = async (postId) => {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);
  };

  const getFilteredPosts = useCallback(async () => {
    const conds = [
      filter.location ? where("city", "==", filter.location) : null,
      filter.intrest ? where("intrest", "==", filter.intrest) : null,
    ].filter((x) => x);

    const postsCollection = collection(db, "posts");

    const q = query(postsCollection, orderBy("publishTime", "desc"), ...conds);
    const docSnap = await getDocs(q);
    const postsArray = [];
    docSnap.forEach((doc) => {
      postsArray.push({ ...doc.data(), id: doc.id });
    });

    setFilteredPosts([...postsArray]);
  }, [filter]);

  // UPDATE/PUT (SET)
  const editUserPost = async (editedPost) => {
    const docRef = doc(db, "posts", editedPost.id);
    await setDoc(docRef, {
      ...editedPost,
      updatedAt: serverTimestamp(),
    });
  };

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
    deleteUserPost,
    editUserPost,

    changeInPosts,
    setChangeInPosts,
    editor,
    setEditor,
    editForm,
    setEditForm,
    loading,
    setLoading,
  };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}
