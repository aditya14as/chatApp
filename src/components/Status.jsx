import { doc, onSnapshot,getDoc  } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { AuthContext } from "../context/AuthContext";

const Status = (props) => {
  const [delivered, setDelieverd] = useState(false);
  const [isSeen, setSeen] = useState(false);
  const { data } = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  
  useEffect(() => {
   
    const userId = data.user.uid;
    const userRef = firebase.database().ref('/status/');
    userRef.on("value", snapshot => {
      const data = snapshot.val()
      // console.log(data[currentUserId]["state"])
      if(userId){
        if(data[userId]["state"]=="online"){
          setDelieverd(true);
        }else{
          setDelieverd(false);
        }
      }
  })
  const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;
        console.log(userId)

  const isSeen = async()=>{
    const docRef = doc(db, "userChats", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data()[combinedId].isSeen);
      setSeen(docSnap.data()[combinedId].isSeen);
    } 
  }
  if(userId){
    isSeen()
  }
  console.log("props");
  }, [props]);


  // console.log(isSeen);
  
  

  return (
    <div className="status">
        <span>{isSeen? "Seen" :(delivered?"Delivered":"Sent")}</span>
    </div>
  );
};

export default Status;
