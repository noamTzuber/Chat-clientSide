import './Register.css'

function Register() {

    function validation() {
        document.getElementById("error-message").innerHTML = ""

        let userName = document.getElementById("userName").value;
        if (userName.length === 0) {
            document.getElementById("error-message").innerHTML += "please enter Username<br>"
        } else if (/[^a-zA-Z0-9]/.test(userName)) {
            document.getElementById("error-message").innerHTML += "Use only English and numbers in Username<br>";
        }

        let nickname = document.getElementById("nickname").value;
        if (nickname.length === 0) {
            document.getElementById("error-message").innerHTML += "please enter Nickname<br>"
        } else if (/[^a-zA-Z0-9]/.test(nickname)) {
            document.getElementById("error-message").innerHTML += "Use only English and numbers in Nickname<br>";
        }


        let password = document.getElementById("password").value;
        if (password.length < 8)
            document.getElementById("error-message").innerHTML += "Use 8 characters or more for your password<br>"
        else {
            if (!/[0-9]/.test(password))
                document.getElementById("error-message").innerHTML += "Use numbers for your password<br>"
            if (!/[a-zA-Z]/.test(password))
                document.getElementById("error-message").innerHTML += "Use letters for your password<br>"

            if (/[^(a-zA-Z0-9)]/.test(password))
                document.getElementById("error-message").innerHTML += "Use only English and numbers for your password<br>"

            if (document.getElementById("password-confirm").value !== password)
                document.getElementById("error-message").innerHTML += "the confirm password is not match<br>"
        }


    }


    return (
        <div id='form' className="my-form position-absolute top-50 start-50 translate-middle">
            <span className="fs-1" style={{padding: '2%', display: 'table', margin: '0 auto'}}>Register</span>

            <div className='inputAndTitle'>
                <div class="fs-6">Username</div>
                <input id='userName' type="text" class="form-control" placeholder="Type your Username"/>
            </div>

            <div className='inputAndTitle'>
                <div class="fs-6">Nickname</div>
                <input id='nickname' type="text" class="form-control" placeholder="Type your Nickname"/>
            </div>

            <div className='inputAndTitle'>
                <div class="fs-6">Password</div>
                <input id='password' type="password" class="form-control" placeholder="Type your Password"/>
            </div>

            <div className='inputAndTitle'>
                <div class="fs-6">Confirm Password</div>
                <input id='password-confirm' type="password" class="form-control" placeholder="Type your Password"/>
            </div>

            <div id='picterUpload' style={{marginLeft: '22%'}}>
                <div class="fs-6">Upload profile picture</div>
                <input type="file" accept="image/*"/>
            </div>

            <p></p>
            <button id='loginButton' class="btn btn-primary" type="button" onClick={validation}>Register</button>

            <div id="error-message"></div>


        </div>
    );
}

export default Register

