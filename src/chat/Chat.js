import './Chat.css'
import SummaryConversation from './summaryConversation/SummaryConversation';
import UserData from "./userData/UserData";

import { useState, useEffect } from "react";
import RightSide from "./rightSide/RightSide";

import { useLocation } from 'react-router-dom';




function Chat() {
    const { state } = useLocation();
    const { id } = state;



    const [myChats, setMyChats] = useState([]);

    const getChats = async function() {
        await fetch("https://localhost:1234/api/Contact/Chats?connectedId="+ id)
            .then(response => response.json())
            .then(data => {
                setMyChats(data);
            });
    }

    useEffect(getChats, [1]);
    // console.log(myChats);


    const [myUser, setMyUser] = useState({id:'', name:'', password:'', server:'' ,contacts:[]});

    const getUser = async function() {
        await fetch("https://localhost:1234/api/Contact/User?connectedId="+id)
            .then(response => response.json())
            .then(data => {
                setMyUser(data);
            });
    }

    useEffect(getUser, [1]);
    // console.log(myUser);



  
    
    const [currentTalk, setCurrentTalk] = useState({ id: 0, user1: '', user2: '', Messages: [] });
    const [currentMessages, setCurrentMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    
    const userList = myUser.contacts.map((contact, key) => {
        return < SummaryConversation{...contact} myUser={myUser} setCurrentConversation={setCurrentTalk} myChats={myChats}  num={key} key={key} />
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

                <RightSide id={id} myUser={myUser} setContact={setContacts} currentConversation={currentTalk} setMessages={setCurrentMessages}  myChats = {myChats} />
            </div>

        </div>


    );
}

export default Chat