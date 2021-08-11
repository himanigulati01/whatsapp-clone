import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../../../firebase";
import { Link } from "react-router-dom";

const SidebarChat = (props) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (props.id) {
      db.collection("rooms")
        .doc(props.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [props.id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChatHandler = () => {
    const roomName = prompt("Please enter group name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  const chat = !props.addNewChat ? (
    <Link to={`/rooms/${props.id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h2>{props.name}</h2>

          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChatHandler} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );

  return chat;
};

export default SidebarChat;
