import './Login.css'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios';


async function getAllUsers(onReply) {
    await fetch("https://localhost:1234/api/Contact/AllUsers")
    .then(response => response.json())
    .then(data => {
        // onReply(data);
        onReply(data);
    });
}


function Login() {
    const [allUsers, setAllUsers] = useState([])
    async function getUsers(){
            const res = await fetch("https://localhost:1234/api/Contact/AllUsers");
            const data = await res.json();
            setAllUsers(data)
        }



    // async function getAllUsers(){
    //     const axios = require('axios');
    //     const res = await axios.get("https://localhost:1234/api/Contact/AllUsers").then(resp=>{setAllUsers(resp.data)});

    // }

    

    const navigate = useNavigate()

    async function varifyLogin(users) {

        var errorMessage = document.getElementById("errorMessage");
        var name = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        let userExist = 0;
        for (var i = 0; i < users.length; i++)
            if(users[i].id === name && users[i].password === password){
                userExist =1;
                break;
            }

        if(userExist){
            navigate('/Chat', {state:{id: users[i].id}})
        }
        else{
            errorMessage.innerHTML = "Username or password incorrect";
        }
    }

    return (
        <div id='form' className="position-absolute top-50 start-50 translate-middle">
            <span className="fs-1" style={{padding: '30px', display: 'table', margin: '0 auto'}}>Login</span>
            <div className='inputAndTitle'>
                <div className="fs-6">Username</div>
                <input id="username" type="text" className="form-control" placeholder="Type your Username" aria-label="Email"
                       aria-describedby="basic-addon1"/>
            </div>



            <div className='inputAndTitle'>
                <div className="fs-6">Password</div>
                <input id="password" type="password" className="form-control" placeholder="Type your Password"
                       aria-label="Email" aria-describedby="basic-addon1"/>
            </div>

            <button id='loginButton' className="btn btn-primary" type="button" onClick={() => {getAllUsers(varifyLogin)}}>Login</button>

            <div id="errorMessage"></div>
            <div>

            </div>

            <div id='registration'>
                <div className="fs-6">Have not accounted yet?</div>
                <a href="/Register" style={{display: 'table', margin: '0 auto'}} className="fs-6">Signed up</a>
                <div className="fs-6" style={{paddingLeft:"15%"}}>Want to reat us?</div>
                <a href="http://localhost:5192" style={{display: 'table', margin: '0 auto'}} className="fs-6">Rate</a>

            </div>


        </div>
    );
}

export default Login

