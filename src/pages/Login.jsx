import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
     const res =  await signInWithEmailAndPassword(auth, email, password);

      var userStatusDatabaseRef = firebase.database().ref("/status/" + res.user.uid);
      var isOfflineForDatabase = {
        state: "offline",
        displayName : res.user.displayName,
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };

      var isOnlineForDatabase = {
        state: "online",
        displayName : res.user.displayName,
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      firebase.database().ref(".info/connected").on("value", function (snapshot) {
        if (snapshot.val() === false) {
          return;
        }
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(function () {
            userStatusDatabaseRef.set(isOnlineForDatabase);
          });
      });
      navigate("/");

    } catch (err) {
      console.log(err)
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatApp</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
