import Contact from "../Contact/Contact";
import Btn from "../Btn/Btn";

import Outgoing from "../message/Outgoing";
import IncomingMessage from "../message/IncomingMassege";

function RightSide(props) {
    function findDestID(){
        if(props.currentConversation.user1 === props.myUser.id){
            return props.currentConversation.user2;
        }
        return props.currentConversation.user1;
    }
    function findDestNickName(){
        var wantedId;
        if(props.currentConversation.user1 === props.myUser.id){
            wantedId= props.currentConversation.user2;
        }
        else {
            wantedId = props.currentConversation.user1;
        }

        for(var i=0; i<props.myUser.contacts.length ; i++){
            if(props.myUser.contacts[i].id===wantedId){
                return props.myUser.contacts[i].name;
            }


    }
        return '';

    }


    function getMessages(){
        var contactId = findDestID();
        var userId = props.myUser.id

        for(let i = 0 ; i < props.myChats.length; i++){
            if(props.myChats[i].user1 === contactId && props.myChats[i].user2 === userId  ||
                props.myChats[i].user2 === contactId && props.myChats[i].user1 === userId ){
                    return props.myChats[i].messages;
                }
        }
        return [];
    }

    return (
        <div className="right-container" >
            <div className="section">
                <div className="content">
                    <Contact name={findDestNickName()} />
                </div>
                <div className='scrollable-content content' style={{backgroundColor: "rgb(194 190 190 / 42%)"}}>

                    {  
                        getMessages().map((src, key ) => {
                            if(props.myUser.id === props.currentConversation.user1){
                                if (src.sent === true) {
                                    return <Outgoing {...src} key={key}/>
                                }
                                return <IncomingMessage {...src} key={key}/>
                            }
                            else{
                                if (src.sent === false) {
                                    return <Outgoing {...src} key={key}/>
                                }
                                return <IncomingMessage {...src} key={key}/>
                            }
                        })
                    }
                </div>
            </div>
            <div className="content">
                <Btn id = {props.id} myUser={props.myUser} setContact ={props.setContact} setMessages={props.setMessages} currentConversation={props.currentConversation} />
            </div>
        </div>
    )
}

export default RightSide;