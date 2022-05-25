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
    const newUser = useRef([]);
    const [myUser, setMyUser] = useState({ id: '', name: '', password: '', server: '', contacts: [] });
    const [contacts, setContacts] = useState([]);

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

    useEffect(async()=>{
        await fetch("https://localhost:1234/api/Contact/User?connectedId=" + id)
            .then(response => response.json())
            .then(data => {
                newUser.current=data;
                setMyUser(data);
            });
    },[]);

    useEffect(() => {
        const connectToServer = new HubConnectionBuilder().withUrl('https://localhost:1234/Hub/ChatHub')
            .withAutomaticReconnect()
            .build();
        setCon(connectToServer);
    }, []);


    function date(){
        var today = new Date();
        let month =today.getMonth()+1<9?'0'+(today.getMonth()+1) : (today.getMonth()+1)
        let day =today.getDate()<9?'0'+(today.getDate()) : (today.getDate())
        let hour =today.getHours()<9?'0'+(today.getHours()) : (today.getHours())
        let minutes=today.getMinutes()<9?'0'+(today.getMinutes()) : (today.getMinutes())
        let second=today.getSeconds()<9?'0'+(today.getSeconds()) : (today.getSeconds())
        let date=today.getFullYear()+'-'+month+'-'+day+'T'+hour+
            ':'+minutes+':'+second+'.'+today.getMilliseconds()+Math.floor(Math.random()*10000);
        return date;

    }

    useEffect( () => {
        if (!con) {
            return;
        }
        con.start().then(isSeccess => {
            con.on("ReceiveMessage", (message, src, dst) => {
                if(newUser.current.id !== src && newUser.current.id !== dst){
                    return
                }

                let chatRoom = newChat.current.find((chat) => (chat.user1 == src && chat.user2 == dst) || (chat.user2 == src && chat.user1 == dst));
                if (chatRoom === undefined) {
                    return
                }

                let isSent = true
                if(newUser.current.id === dst){
                    isSent = false
                }
                if(newUser.current.id === chatRoom.user2){
                    isSent = !isSent
                }

                chatRoom.messages.push({ id: chatRoom.messages.length, content: message, sent:isSent, created: date() });
                setMyChats(newChat.current.concat([]));


                let newContacts = newUser.current.contacts;
                for(let i = 0 ; i <newContacts.length; i++){{
                    if(newContacts[i].id === src){
                        newContacts[i].last = message;
                        newContacts[i].lastdate = date();
                        setMyUser({ id: newUser.current.id, name: newUser.current.name,  password: newUser.current.password,  server: newUser.current.server, contacts: newContacts })
                    }
                }}

            })
            con.on("ContactAdded", async (contactId, name, server, src, dst) => {
                let contactList=newUser.current.contacts;
                let contact=newUser.current.contacts.find((contact)=>(contact.id === contactId))
                 if(contact !== undefined || (newUser.current.id !== src && newUser.current.id !== dst) ){
                    return;
                }
                await fetch("https://localhost:1234/api/Contact/User?connectedId=" + id)
                        .then(response => response.json())
                        .then(data => {
                            newUser.current.contacts=data.contacts;
                        }).then(()=>{
                            newChat.current.push({id:newChat.current.length+1,user1:src,user2:dst,messages:[]})
                        console.log( newChat.current)
                        setMyChats(newChat.current.concat([]));
                    });
            })
        })
    }, [con]);



    const [currentTalk, setCurrentTalk] = useState({ id: 0, user1: '', user2: '', Messages: [] });
    const [currentMessages, setCurrentMessages] = useState([]);


    const userList = myUser.contacts.map((contact, key) => {
        return < SummaryConversation{...contact} myUser={myUser} setCurrentConversation={setCurrentTalk} myChats={myChats} num={key} key={key} />
    });

    return (
        <div className='chatbox' style={{ minWidth: "700px" }}>

            <div className="col-3">
                <div className="container">
                    <div className="section" id="left-section">
                        <div className="content"   >
                            <UserData con={con} myUser={myUser} setContacts={setContacts} />
                        </div>
                        <div className="scrollable-content" id="summary-conversation"
                            style={{ marginTop: "1%", backgroundColor: "rgb(194 190 190 / 42%)" }}>
                            {userList}

                        </div>
                    </div>
                </div>
            </div>

            <div className="col-9">

                <RightSide con={con} id={id} myUser={myUser} setContact={setContacts} currentConversation={currentTalk} setMessages={setCurrentMessages} myChats={myChats} setMyUser={setMyUser}/>
            </div>

        </div>


    );
}

export default Chat