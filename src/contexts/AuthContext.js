import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");

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
    const q = query(postsCollection,where("userId", "!=", "-1"));
    const docSnap = await getDocs(q)
    const postsArray = []
    docSnap.forEach((doc) => {
      postsArray.push(doc.data());
    });
    // console.log(postsArray);
    setPosts([...postsArray]);
  }

  // , where("userId", "==", currentUser.uid)

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
    setNewPost,
    getAllPosts,
    posts,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
