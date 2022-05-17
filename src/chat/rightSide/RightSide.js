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

    return (
        <div className="right-container" >
            <div className="section">
                <div className="content">
                    <Contact name={chooseName()} img = {"ron.jpg"} />
                </div>
                <div className='scrollable-content content' style={{backgroundColor: "rgb(194 190 190 / 42%)"}}>

                    {props.currentConversation.Messages.map((src, key ) => {

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