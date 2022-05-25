import './UserData.css'
import React from "react";

import axios from "axios";


function UserData(props) {


    var profilePic;

    profilePic = require("../../DB/profilePictures/diff.jpg");
//}

    var nickname = props.myUser.name;

    async function addUser() {
        document.getElementById("addUserErrorMessage").innerHTML = "";

        var contactId = document.getElementById("inputAddUser").value;
        var nickName = document.getElementById("inputAddNickName").value;
        var server = document.getElementById("inputAddServer").value;
        document.getElementById("inputAddUser").value = '';
        document.getElementById("inputAddNickName").value = '';
        document.getElementById("inputAddServer").value = '';

        let exist = false;
        let isFailed = false;

       // check if want to add myself
        if(contactId === props.myUser.id){
            isFailed = true;
            document.getElementById("addUserErrorMessage").innerHTML = "you can't add yourself"
        }
        console.log(nickName.length)
        if(nickName.length > 25){
            isFailed = true;
            document.getElementById("addUserErrorMessage").innerHTML = "the nickName is too long"
        }

        for (let j = 0; j < props.myUser.contacts.length; j++) {
            // check if the contact name already in my contact list
            if (props.myUser.contacts[j].id === contactId) {
                isFailed = true;
                document.getElementById("addUserErrorMessage").innerHTML = "the user already exist"
            }
        }

        if(server === '' || nickName ===''|| contactId === ''){
            document.getElementById("addUserErrorMessage").innerHTML = "please fill all the fields"

        }
        else if (!isFailed) {
            console.log("in here!")
            await axios.post("https://"+server+"/api/Invitations/",{
                from:props.myUser.id,
                to:contactId,
                server:props.myUser.server
            }).then(async (res) =>{

                await axios.post("https://localhost:1234/api/Contact/?connectedId="+props.myUser.id, {
                    id: contactId,
                    name: nickName,
                    server: server
                }).then((response) =>
                    {
                        document.getElementById("closeButtonModal").click();
                        props.con.invoke("AddContact", props.myUser.id,props.myUser.id, props.myUser.server, props.myUser.id, contactId);

                    }
                )
                    .catch(response=>{
                        document.getElementById("addUserErrorMessage").innerHTML = "Invalid UserName or Server";
                    })


            }).catch(res=>{
                document.getElementById("addUserErrorMessage").innerHTML = "invitations not work";
            })


        }
    }

        // check if there is  exist match user
        // for(var i = 0; i < users.length;i++){
        //     if (users[i].id === contactId){
        //         exist = true;
        //         break
        //     }
        // }
        // if(onMyContacts){
        //     document.getElementById("addUserErrorMessage").innerHTML = "the user already exist";
        // }
        // else if(exist && !onMyContacts && contactId !== users[props.id].id){
        //     users[props.id].contacts.push({idc: contactId,name: contactId, last: "", lastdate: ""})
        //     props.setContacts(users[props.id].contacts.concat([]));
        //     chats.push({id:chats.length+1, user1: users[props.id].id,user2:contactId,Messages: []})
        //     chats.concat([]);
        //
        //
        //     document.getElementById("closeButtonModal").click();
        //
        // } else{
        //     document.getElementById("addUserErrorMessage").innerHTML = "Invalid UserName";
        // }

    return (

        <div className="d-flex userData" style={{backgroundColor:"rgba(194, 190, 190, 0.42)", marginLeft: "0%"}}>
                <div className="col-3 card d-flex" style={{justifyContent: "center",background: "none",border: "none", borderRadius: "25px", marginLeft: "3%", width: "75px", height: "75px"}}>
                    <img src={profilePic} className="rounded-circle" style={{height: "70px", width: "70px", alignSelf: "center", justifySelf: "center"}}/>
                </div>
                <div className="col card d-flex text-truncate" style={{display: "inline-block" ,border: "none",fontSize:"120%", background: "none", justifyContent: "center", alignItems: "center"}}>{nickname}
                </div>
                <div className="col-2 card d-flex"  style={{width: "15%",background: "none",borderRadius: "30%", border: "none",marginTop: "-2%", justifyContent: "center", alignItems: "center"}}>
                    <button id="addConversation" type="button" className="btn btn-outline-light" data-toggle="modal"
                    data-target="#myModal" style={{}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    </button>
                </div>

    {/** 
            <div style={{backgroundImage: `url(${profilePic})`, backgroundSize:"cover", width:"70px", height:"70px", clipPath: "circle()", backgroundPosition: "center center", marginLeft:"3%"}}></div>
            {/*<img src={profilePic} style={{width: "17%", borderRadius: "50%", clipPath: "circle()"}}/>

            <span className="position-absolute top-50 start-50 translate-middle" style={{fontSize:"170%"}}>{nickname}</span>

            <button id="addConversation" type="button" className="btn btn-outline-light" data-toggle="modal"
                    data-target="#myModal" style={{position:"absolute", top:"20%", right:"0%"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </button>

    */}

            {/*modal*/}
            <div className="modal fade" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3 className="modal-title">Add user</h3>
                            <button id = "closeButtonModal" type="button" className="close" data-dismiss="modal"  style={{padding:"1px",border:"0",
                                backgroundColor: "transparent"}}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input id="inputAddUser" type="text" className="form-control" placeholder="username"
                                       aria-label="username" aria-describedby="button-addon2"/>
                                </div>
                            <div className="input-group mb-3">
                                <input id="inputAddNickName" type="text" className="form-control" placeholder="nickname"
                                       aria-label="username" aria-describedby="button-addon2"/>
                            </div>
                            <div className="input-group mb-3">
                                <input id="inputAddServer" type="text" className="form-control" placeholder="server"
                                       aria-label="username" aria-describedby="button-addon2"/>
                            </div>
                            <div id = "addUserErrorMessage" style={{color :"red"}}></div>
                        </div>

                        <div className="modal-footer">

                            <button type="button" className="btn btn-success" onClick={() => {
                                addUser()
                            }}>Add User</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserData