import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MicNoneOutlined, MoreVert, SearchOutlined } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import db from '../../firebase'
import { useStateValue } from '../../Context/StateProvider'
import firebase from "firebase"

const Chat = () => {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}] = useStateValue()
    useEffect(()=>{
        if(roomId){
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapShot => 
                setRoomName(snapShot.data().name))
            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapShot => 
                    setMessages(snapShot.docs.map(doc => doc.data())))
        }
    },
    [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessageHandler = (event) => {
        event.preventDefault()
        // console.log(input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        })
        setInput("")
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>

                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}
                
                
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input
                        type="text"
                        value={input}
                        onChange={event => setInput(event.target.value)} placeholder="Type a message" />
                    <button onClick={sendMessageHandler} type="submit">Send</button>
                </form>
                <MicNoneOutlined />
            </div>
        </div>
    )
}

export default Chat