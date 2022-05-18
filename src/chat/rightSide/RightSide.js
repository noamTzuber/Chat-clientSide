import Contact from "../Contact/Contact";
import Btn from "../Btn/Btn";
import users from "../../DB/DB";
import Outgoing from "../message/Outgoing";
import IncomingMessage from "../message/IncomingMassege";

function RightSide(props) {
    function chooseName(){
        if(props.currentConversation.user1 === users[props.id].id){
            return props.currentConversation.user2;
        }
        return props.currentConversation.user1;
    }

    function getMessages(){
        var contactId = chooseName();
        var userId = users[props.id].id
        console.log(props.myChats);

        for(let i = 0 ; i < props.myChats.length; i++){
            console.log(props.myChats[i]);
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
                    <Contact name={chooseName()} />
                </div>
                <div className='scrollable-content content' style={{backgroundColor: "rgb(194 190 190 / 42%)"}}>

                    {  
                        getMessages().map((src, key ) => {
                        if (src.sent === false) {
                            return <Outgoing {...src} key={key}/>
                        }
                        return <IncomingMessage {...src} key={key}/>
                    })
                    }
                </div>
            </div>
            <div className="content">
                <Btn setContact ={props.setContact} setMessages={props.setMessages} currentConversation={props.currentConversation} id = {props.id}/>
            </div>
        </div>
    )
}

export default RightSide;