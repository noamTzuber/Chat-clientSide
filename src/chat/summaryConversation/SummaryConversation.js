import './SummaryConversation.css'


// {name, lastTime, lastMessage, setCurrentConversation}
function SummaryConversation(props) {


    var showConversation = function (id) {
        for (let i = 0; i < props.myChats.length; i++) {
            // console.log(i)
            if (( props.myChats[i].user1 === props.myUser.id && props.myChats[i].user2 === id )||
            (props.myChats[i].user2 === props.myUser.id && props.myChats[i].user1 === id)) {
                props.setCurrentConversation(props.myChats[i]);
            }

        }
    }

    function shortLastMessage(){
        let maxSize = 25;
        if(props.last.length < maxSize){
            return props.last;
        }
        return props.last.substring(0,maxSize).concat('',"...");

    }


    var pic = require("../../DB/profilePictures/diff.jpg");
    return (
        <div>
            <div onClick={() => {
                showConversation(props.id)
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