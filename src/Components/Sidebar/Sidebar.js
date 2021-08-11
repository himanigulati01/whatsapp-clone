import React, { useEffect, useState } from "react";
import "./Sidebar.css";

import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import SidebarChat from "./SidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../../Context/StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [search, setSearch] = useState("");
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  const filteredSearch = rooms.filter((room) =>
    room.data.name.toLowerCase().includes(search.toLowerCase())
  );

  let sidebarChat = !(search === "")
    ? filteredSearch.map((room) => (
        <SidebarChat
          key={room.id}
          id={room.id}
          //name = {room.data.name.toLowerCase().includes(search.toLowerCase())}
          name={room.data.name}
        />
      ))
    : rooms.map((room) => (
        <SidebarChat
          key={room.id}
          id={room.id}
          //name = {room.data.name.toLowerCase().includes(search.toLowerCase())}
          name={room.data.name}
        />
      ));

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input
            type="search"
            placeholder="Search or Start new Chat"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {sidebarChat}
      </div>
    </div>
  );
};

export default Sidebar;
