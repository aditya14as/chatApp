import React, { useContext, useEffect, useState} from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    console.log("checking online and offline")
    const userId = data.user.uid;
    const userRef = firebase.database().ref('/status/');
    userRef.on("value", snapshot => {
      const data = snapshot.val()
      // console.log(data[currentUserId]["state"])
      if(userId){
        if(data[userId]["state"]=="online"){
          setOnline(true);
        }else{
          setOnline(false);
        }
      }
  })
}, []);

    

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        {/* <span>{online? "Online":"Offline"}</span> */}
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
