import React, { useState } from "react";
import { Button, Card, Alert, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { async } from "@firebase/util";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [post, SetPost] = useState({ descriptin: "" });

  async function submitPost (e) {
    e.preventDefault()
    const collectionRef = collection(db, 'posts')
    await addDoc(collectionRef, {...post, timestamp: serverTimestamp(),})
    return true
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <>
    <h1>{currentUser.email}</h1>
      {/* <Card className="card">
        <Card.Body>
          <h2 className="card text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h2 className="card text-center mb-4">Create a new post</h2>
          <Form onSubmit={submitPost}>
            <textarea
              value={post.descriptin}
              onChange={(e) => SetPost({ ...post, descriptin: e.target.value })}
            ></textarea>
            <Button>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </>
  );
};

export default Dashboard;
