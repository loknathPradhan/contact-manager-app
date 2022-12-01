// import "../pages/"
import React from "react";
import axios from "axios"
import { useState, } from "react";
// import { useNavigate } from "react-router-dom";


const Login = () => {
    // const navigator = useNavigate()
    const [login, setlogin] = useState({})


    const oldUser = async () => {
        if (login.email && login.password) {
            await axios.post("http://localhost:8000/login", login)
                .then((res) => {
                    if (res.data.message ==="success") {
                        window.localStorage.setItem("token",res.data.token)
                        alert("signin Sucessull!")
                        // navigator("/home")

                    }
                    if(res.data.message==="Unregistered"){
                        alert("User not Registered !")
                    }
                    if(res.data.message==="Invalid"){
                        alert("Invalid Crediential!")
                    }
                  
                
                })
                .catch(err => { console.log(err) })
        }
        else {
            alert("Input field shouldn't be Empty!")
        }

    }
    return (
            <div id="login-container">
                <section id="top-section">
                <div  className="image-box1">
                
                </div>
                <div className="image-box2">
                
                </div>
                </section>
                <section id="middle">
                <h1>Login</h1>
                <p>Enter your Credentials to access your account</p>
                
                <div>
                <input className="input" type="text" placeholder="User-Email" onChange={(e) => { setlogin({ ...login, email: e.target.value }) }} name="userEmail" /> 
                </div>
                <div>
                <input className="input" type="password" placeholder="Password" onChange={(e) => { setlogin({ ...login, password: e.target.value }) }} name="password" />
                </div>
                <div>
                <button type="submit" onClick={oldUser}>Sign In</button>
                </div>
                <div>
                <a href="/Signup">sign up</a>
                </div>
                </section>
            <section id="bottom-section">
            
            </section>
            </div>    
    )
}

export default Login