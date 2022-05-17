import './Chat.css'
import SummaryConversation from './summaryConversation/SummaryConversation';
import UserData from "./userData/UserData";

import users from "../DB/DB";
import { useState, useEffect } from "react";
import RightSide from "./rightSide/RightSide";

import axios from 'axios';


import { useLocation } from 'react-router-dom';




function Chat() {
    const { state } = useLocation();
    const { id } = state;


    const [currentTalk, setCurrentTalk] = useState({ id: 0, user1: '', user2: '', Messages: [] });
    const [currentMessages, setCurrentMessages] = useState([]);
    const [contacts, setContacts] = useState(users[id].contacts);

    const [user2, setUser2] = useState({ id: '', name: '', password: '', server: '', contacts: [] });
    const [chats2, setChats2] = useState([])

   
    // async function post(){
    //     const response = await axios.post("https://localhost:1234/api/Contact", {
    //                     "connectedId": "yossi",
    //                     "id": "string",
    //                     "name": "string",
    //                     "server": "string"
    //                 });
    
    // }
    
    async function get(){
        const response = await axios.get("https://localhost:1234/api/Contact/Chats");
        // setChats2(response.data);
         
    }
    
    get();
    console.log(chats2);

    


    const userList = contacts.map((users, key) => {
        return < SummaryConversation{...users} setCurrentConversation={setCurrentTalk} id={id} num={key} key={key} />
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

                <RightSide setContact={setContacts} currentConversation={currentTalk} setMessages={setCurrentMessages} id={id} />
            </div>

        </div>


    );
}

export default Chat