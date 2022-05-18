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
    
    const response = fetch("https://localhost:1234/api/Contact/AllUsers")
    const data = response.data;
    console.log(data);


    // const [myChats, setMyChats] = useState([]);
    // useEffect(async () =>{
    //     const res = await fetch("https://localhost:1234/api/Contact/Chats");
    //     const data = await res.json();
    //     setMyChats(data);
        
    // },[])
    


    // const [myUser, setMyUser] = useState({ id: '', name: '', password: '', server: '', contacts: [] });
    // useEffect(async () =>{
    //     const res = await fetch("https://localhost:1234/api/Contact/User");
    //     const data = await res.json();
    //     setMyUser(data);
    // },[])
            // console.log(myUser.contacts);



    // useEffect(async () =>{
    //     await fetch("https://localhost:1234/api/Contact/User").then(response =>{
    //         if(response.ok){
    //             return response.json();
    //         }
    //     })
    //     .then(data => {
    //         setMyUser(data);
    //     })
    // },[])

    // async function get(){
    //     const res = await fetch("https://localhost:1234/api/Contact/User");
    //     const data = await res.json();
    //     setMyUser(data);
    // }
    // // get();
    // console.log(myUser);


    

    const [currentTalk, setCurrentTalk] = useState({ id: 0, user1: '', user2: '', Messages: [] });
    const [currentMessages, setCurrentMessages] = useState([]);
    const [contacts, setContacts] = useState(users[id].contacts);



   
    // async function post(){
    //     const response = await axios.post("https://localhost:1234/api/Contact", {
    //                     "connectedId": "yossi",
    //                     "id": "string",
    //                     "name": "string",
    //                     "server": "string"
    //                 });
    
    // }
    // console.log(myUser);
    
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