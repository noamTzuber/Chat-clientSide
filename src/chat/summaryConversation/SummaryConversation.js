import './SummaryConversation.css'
import users from "../../DB/DB";
import chats from "../../DB/Chats";

// {name, lastTime, lastMessage, setCurrentConversation}
function SummaryConversation(props) {
    function showBottomBar(){

    }
    var showConversation = function (idc) {
        for (let i = 0; i < chats.length; i++) {
            if ((chats[i].user1 === users[props.id].id && chats[i].user2 === idc )||
            (chats[i].user2 === users[props.id].id && chats[i].user1 === idc)) {
                props.setCurrentConversation(chats[i]);
            }
        }


//         for (let i = 0; i < users[props.id].contacts.length; i++) {
//             if (contact === users[props.id].contacts[i].idc) {
//                 props.setCurrentConversation(users[props.id].chats[i]);
//             }
//         }
        showBottomBar();
    }
    //const profilePic = require("../../DB/profilePictures/".concat("", users[0].chats[props.key].img));

    function shortLastMessage(){
        let maxSize = 25;
        if(props.last.length < maxSize){
            return props.last;
        }
        return props.last.substring(0,maxSize).concat('',"...");

    }


    var pic = require("../../DB/profilePictures/".concat("",users[props.id].contacts[props.num].img));
    return (
        <div>
            <div onClick={() => {
                showConversation(props.idc)
            }}>
                <div className="list-group-item list-group-item-action">
                    <div className="row">
                        <div className="col-2">
                            <div style={{backgroundImage: `url(${pic})`, backgroundSize:"cover", width:"50px", height:"50px", borderRadius:"50%", clipPath: "circle()", backgroundPosition: "center center", marginRight:"100%"}}></div>
                        </div>
                        <div className="col-10" style={{paddingLeft:"5%"}}>
                            <div>
                                <div className="row">
                                    <div className="col-8">
                                        <span style={{fontSize:"120%", marginLeft:"5px"}}>{props.name}</span>
                                    </div>
                                    <div className="col-4">
                                        <span className="dateOnSummery" >{props.lastdate}</span>
                                    </div>
                                    </div>
                            </div>

                            <div>
                                <span style={{color:"darkgray" ,marginLeft:"5px"}}>{shortLastMessage()}</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryConversation