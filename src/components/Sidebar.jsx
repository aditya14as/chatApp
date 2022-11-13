import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';



const Sidebar = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const userRef = firebase.database().ref('/status/');
    userRef.on("value", snapshot => {
      const data = snapshot.val();
      const arr = []
    Object.keys(data).forEach(key => arr.push({name: key, value: data[key]}))
      // console.log(arr);
      // console.log(arr[0]["value"]["displayName"])
      // console.log(arr[0]["value"]["state"]=="offline")
      setOnlineUsers(...arr);
    })
   
  }, []);
  console.log(onlineUsers);

  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;
