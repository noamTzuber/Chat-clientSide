import './Chat.css'
import SummaryConversation from './summaryConversation/SummaryConversation';
import UserData from "./userData/UserData";

import users from "../DB/DB";
import { useState, useEffect } from "react";
import RightSide from "./rightSide/RightSide";

import axios from 'axios';


import { useLocation } from 'react-router-dom';




function Chat() {
    const [myChats, setMyChats] = useState([]);

    const getChats = async function() {
        await fetch("https://localhost:1234/api/Contact/Chats")
            .then(response => response.json())
            .then(data => {
                setMyChats(data);
            });
    }

    useEffect(getChats, [1]);
    // console.log(myChats);


    const [myUser, setMyUser] = useState({id:'', name:'', password:'', server:'' ,contacts:[]});

    const getUser = async function() {
        await fetch("https://localhost:1234/api/Contact/User")
            .then(response => response.json())
            .then(data => {
                setMyUser(data);
            });
    }

    useEffect(getUser, [1]);
    // console.log(myUser);



    const { state } = useLocation();
    const { id } = state;
    
    const [currentTalk, setCurrentTalk] = useState({ id: 0, user1: '', user2: '', Messages: [] });
    const [currentMessages, setCurrentMessages] = useState([]);
    const [contacts, setContacts] = useState([]);


   
    // async function post(){
    //     const response = await axios.post("https://localhost:1234/api/Contact", {
    //                     "connectedId": "yossi",
    //                     "id": "string",
    //                     "name": "string",
    //                     "server": "string"
    //                 });
    
    // }
    // console.log(myUser);

    // console.log(contacts)
    
    const userList = myUser.contacts.map((contact, key) => {
        return < SummaryConversation{...contact} setCurrentConversation={setCurrentTalk} myChats={myChats} userId={id} num={key} key={key} />
    });

    return (
        <div className='chatbox' style={{ minWidth: "700px" }}>

            <div className="col-3">
                <div className="container">
                    <div className="section" id="left-section">
                        <div className="content"   >
                            <UserData id={id} setContacts={setContacts} />
                        </div>
                        <div className="scrollable-content" id="summary-conversation"
                            style={{ marginTop: "1%", backgroundColor: "rgb(194 190 190 / 42%)" }}>
                            {userList}

                        </div>
                    </div>
                </div>
            </div>

            <div className="col-9">

                <RightSide myUser={myUser} setContact={setContacts} currentConversation={currentTalk} setMessages={setCurrentMessages} id={id} myChats = {myChats} />
            </div>

        </div>


    );
}

export default Chat