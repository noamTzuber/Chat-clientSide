import './Chat.css'
import SummaryConversation from './summaryConversation/SummaryConversation';
import UserData from "./userData/UserData";

import { useState, useEffect, useRef } from "react";
import RightSide from "./rightSide/RightSide";

import { useLocation } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';




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


    const getUser = async function () {
        await fetch("https://localhost:1234/api/Contact/User?connectedId=" + id)
            .then(response => response.json())
            .then(data => {
                newUser.current = data;
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
                if (newUser.current.id !== src && newUser.current.id !== dst) {
                    return
                }

                let chatRoom = newChat.current.find((chat) => (chat.user1 == src && chat.user2 == dst) || (chat.user2 == src && chat.user1 == dst));
                if (chatRoom === undefined) {
                    return
                }



                let isSent = true
                if (newUser.current.id === dst) {
                    isSent = false
                }
                if (newUser.current.id === chatRoom.user2) {
                    isSent = !isSent
                }


                var today = new Date();
                let month = today.getMonth() + 1 < 9 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
                let day = today.getDay() < 9 ? '0' + (today.getDay()) : (today.getDay())
                let hour = today.getHours() < 9 ? '0' + (today.getHours()) : (today.getHours())
                let minutes = today.getMinutes() < 9 ? '0' + (today.getMinutes()) : (today.getMinutes())
                let second = today.getSeconds() < 9 ? '0' + (today.getSeconds()) : (today.getSeconds())
                let date = today.getFullYear() + '-' + month + '-' + day + 'T' + hour +
                    ':' + minutes + ':' + second + '.' + today.getMilliseconds();


                chatRoom.messages.push({ id: chatRoom.messages.length, content: message, sent: isSent, created: date });
                setMyChats(newChat.current.concat([]));


                let newContacts = newUser.current.contacts;

                for (let i = 0; i < newContacts.length; i++) {
                    {

                        if (newContacts[i].id === src) {
                            console.log("founded!!");

                            newContacts[i].last = message;
                            newContacts[i].lastdate = date;
                            setMyUser({ id: newUser.current.id, name: newUser.current.name, password: newUser.current.password, server: newUser.current.server, contacts: newContacts })
                        }


                    }
                }
            })
            con.on("ContactAdded", (contactId, name, server, src, dst) => {

                if (newUser.current.id !== src && newUser.current.id !== dst) {
                    return
                }
                // await Clients.All.SendAsync("ReceiveMessage", transferMessageObject.Content, src, dst);

                let contactList = newUser.current.contacts;
                let contact = newUser.current.contacts.find((contact) => (contact.id === contactId))
                console.log(newUser.current)
                if (contact !== undefined || contactId === newUser.current.id) {
                    console.log(contact);
                    /**try do it without to refresh all page.*/
                    window.location.reload(false);
                    return;
                }
                contactList.push({ id: contactId, name: name, server: server, last: '', lastdate: '' })
                console.log(JSON.stringify(newUser.current))
                setMyUser(
                    { id: myUser.id, name: myUser.name, password: myUser.password, server: myUser.server, contacts: contactList }
                );
                /**try do it without to refresh all page.*/
                window.location.reload(false);



            })
        })
    }, [con]);




    // useEffect(() => {
    //
    //     if (!con) {
    //         return;
    //     }
    //     con.start().then(isSeccess => {
    //         con.on("ContactAdded", (contactId, name, server, src, dst) => {
    //             let contactList=newUser.current.contacts;
    //             let contact=newUser.current.contacts.find((contact)=>(contact.id === contactId))
    //             console.log(newUser.current)
    //             if(contact !== undefined || contactId === newUser.current.id){
    //                 console.log(contact);
    //                 window.location.reload(false);
    //                 return;
    //             }
    //             contactList.push({id: contactId, name: name, server: server, last: '', lastdate: ''})
    //             console.log(JSON.stringify(newUser.current))
    //             setMyUser(
    //                 {id:myUser.id,name: myUser.name,password:myUser.password,server:myUser.server,contacts: contactList}
    //             );
    //             window.location.reload(false);
    //
    //         })
    //     })
    // }, [con]);






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

                <RightSide con={con} id={id} myUser={myUser} setContact={setContacts} currentConversation={currentTalk} setMessages={setCurrentMessages} myChats={myChats} setMyUser={setMyUser} />
            </div>

        </div>


    );
}

export default Chat