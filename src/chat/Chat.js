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
                console.log("Itay and noam ruined it!!! :(")
                console.log(newChat.current)
            });
    }
    useEffect(getChats, [1]);



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
                console.log(message)
                let chatRoom = newChat.current.find((chat) => (chat.user1 == src && chat.user2 == dst) || (chat.user2 == src && chat.user1 == dst));
                if (chatRoom == undefined) {
                    console.log("Couldn't find chat: " + src + ", " + dst)
                    console.log("myChats: " + JSON.stringify(newChat.current))
                    return
                }
                chatRoom.messages.push({ id: chatRoom.messages.length, content: message, sent: true, created: '11/30/2000' });
                console.log("Trying to add message")
                setMyChats(newChat.current.concat([]));

                /*
                                console.log("reciesced " +  JSON.stringify(myChats));
                                const updatedChatWithNewMassege = [...newChat.current]
                                // console.log(JSON.stringify(updatedChatWithNewMassege) + "0")
                                
                                console.log(myChats.length)
                                for(var i = 0 ; i < myChats.length; i++){
                                    if((updatedChatWithNewMassege[i].user1 ==="noam"&& updatedChatWithNewMassege[i].user2 === "yossi") ||
                                        (updatedChatWithNewMassege[i].user2 === "noam" && updatedChatWithNewMassege[i].user1 === "yossi")){
                                            console.log("found chat")
                                            
                                            // updatedChatWithNewMassege[i].messages.push({id : updatedChatWithNewMassege[i].messages.length + 1, content : message, created :"10:10", sent : (true)} );
                                            // console.log(JSON.stringify(updatedChatWithNewMassege) + "1")
                
                                            // console.log(JSON.stringify(updatedChatWithNewMassege) + "1")
                                            // console.log(JSON.stringify(myChats) + "2")
                                            console.log("Itay is king")
                                            // console.log("Hello: \n" + JSON.stringify(updatedChatWithNewMassege))
                                            // setMyChats(myChats[i].messages.concat([{id : updatedChatWithNewMassege[i].messages.length + 1, content : message, created :"10:10", sent : (true)}]));
                                            myChats[i].message.push({id : updatedChatWithNewMassege[i].messages.length + 1, content : message, created :"10:10", sent : (true)})
                                            setMyChats(myChats.concat([]))
                                        }
                                }
                                */
            })
        })
    }, [con]);









    const [myUser, setMyUser] = useState({ id: '', name: '', password: '', server: '', contacts: [] });

    const getUser = async function () {
        await fetch("https://localhost:1234/api/Contact/User?connectedId=" + id)
            .then(response => response.json())
            .then(data => {
                setMyUser(data);
                console.log("Updated user")
            });
    }

    useEffect(getUser, [1]);
    // console.log(myUser);





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