import { doc, onSnapshot,getDoc  } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { AuthContext } from "../context/AuthContext";

import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [delivered, setDelieverd] = useState(false);
  const [isSeen, setSeen] = useState(false);
  const { data } = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
   
  //   const userId = data.user.uid;
  //   const userRef = firebase.database().ref('/status/');
  //   userRef.on("value", snapshot => {
  //     const data = snapshot.val()
  //     // console.log(data[currentUserId]["state"])
  //     if(userId){
  //       if(data[userId]["state"]=="online"){
  //         setDelieverd(true);
  //       }else{
  //         setDelieverd(false);
  //       }
  //     }
  // })
  // const combinedId =
  //     currentUser.uid > data.user.uid
  //       ? currentUser.uid + data.user.uid
  //       : data.user.uid + currentUser.uid;
  //       console.log(userId)

  // const isSeen = async()=>{
  //   const docRef = doc(db, "userChats", userId);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     // console.log("Document data:", docSnap.data()[combinedId].isSeen);
  //     setSeen(docSnap.data()[combinedId].isSeen);
  //   } 
  // } 
  // isSeen()
    return () => {
      unSub();
    };
  }, [data.chatId]);

  
  

  return (
    <div className="messages">
      <div >
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
    {/* <span>{isSeen? "Seen" :(delivered?"Delivered":"Sent")}</span> */}
    </div>
    
    
  );
};

export default Messages;
