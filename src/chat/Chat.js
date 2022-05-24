import './Chat.css'
import SummaryConversation from './summaryConversation/SummaryConversation';
import UserData from "./userData/UserData";

import { useState, useEffect, useRef } from "react";
import RightSide from "./rightSide/RightSide";

import { useLocation } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';




function Chat() {
    const { state } = useLocation();
    const { id } = state;
    const [con, setCon] = useState(null);
    const newChat = useRef([]);

    const [myChats, setMyChats] = useState([]);
    const getChats = async function () {
        await fetch("https://localhost:1234/api/Contact/Chats?connectedId=" + id)
            .then(response => response.json())
            .then(data => {
                newChat.current = data;
                setMyChats(data);
            });
    }
    useEffect(getChats, [1]);

    const [myUser, setMyUser] = useState({ id: '', name: '', password: '', server: '', contacts: [] });

    const getUser = async function () {
        await fetch("https://localhost:1234/api/Contact/User?connectedId=" + id)
            .then(response => response.json())
            .then(data => {
                setMyUser(data);
            });
    }
    useEffect(getUser, [1]);



    useEffect(() => {
        const connectToServer = new HubConnectionBuilder().withUrl('https://localhost:1234/Hub/ChatHub')
            .withAutomaticReconnect()
            .build();
        setCon(connectToServer);
    }, []);


    useEffect(() => {
        if (!con) {
            return;
        }

        con.start().then(isSeccess => {
            con.on("ReceiveMessage", (message, src, dst) => {
                let chatRoom = newChat.current.find((chat) => (chat.user1 == src && chat.user2 == dst) || (chat.user2 == src && chat.user1 == dst));
                if (chatRoom == undefined) {
                    return
                }
 
                chatRoom.messages.push({ id: chatRoom.messages.length, content: message, sent:true, created: '11/30/2000' });
                setMyChats(newChat.current.concat([]));
            })
        })
    }, [con]);


    useEffect(() => {
        console.log("in here")
        if (!con) {
            return;
        }

            con.on("ContactAdded", (contactId, name, server, src, dst) => {
                console.log("new contact");
            })
        
    }, [con]);









  





    const [currentTalk, setCurrentTalk] = useState({ id: 0, user1: '', user2: '', Messages: [] });
    const [currentMessages, setCurrentMessages] = useState([]);
    const [contacts, setContacts] = useState([]);

    const userList = myUser.contacts.map((contact, key) => {
        return < SummaryConversation{...contact} myUser={myUser} setCurrentConversation={setCurrentTalk} myChats={myChats} num={key} key={key} />
    });

    return (
        <div className='chatbox' style={{ minWidth: "700px" }}>

            <div className="col-3">
                <div className="container">
                    <div className="section" id="left-section">
                        <div className="content"   >
                            <UserData myUser={myUser} setContacts={setContacts} />
                        </div>
                        <div className="scrollable-content" id="summary-conversation"
                            style={{ marginTop: "1%", backgroundColor: "rgb(194 190 190 / 42%)" }}>
                            {userList}

                        </div>
                    </div>
                </div>
            </div>

            <div className="col-9">

                <RightSide con={con} id={id} myUser={myUser} setContact={setContacts} currentConversation={currentTalk} setMessages={setCurrentMessages} myChats={myChats} />
            </div>

        </div>


    );
}

export default Chat