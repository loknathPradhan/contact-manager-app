import React, { useState } from 'react';
import axios from "react"
// import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user, setUser] = useState({})
    // const navigator = useNavigate()
    const registration = () => {
        if(user.email && user.password && user.confirm_password) {
            if(user.password === user.confirm_password) {

                axios.post("http://localhost:8000/signup", user)
                .then((res)=> {
                    alert(res.data.message)
                })
                navigator("/")
                .catch(e => console.log(e))
            }else{
                alert("Credentials are not matched")
            }
        }else{
            alert("Input Field should not be blank !")
        }
    }


    return (
        <div id='sign_up container'>
            <section id='top_section'>
                <div className='img-box1'>

                </div>
                <div className='img-box2'>
                     
                </div>

            </section>

            <section id='middle'>
                <h1>Register</h1>
                <div>
                   <input className='input' type='email' placeholder='Email-Id' 
                   onChange={(e)=>{setUser({...user,email: e.target.value})}} 
                   name="email"/>
                </div>
                <div>
                <input className='input' type='password' placeholder='password-Id' 
                onChange={(e)=>{setUser({...user,password: e.target.value})}} 
                name="password"/>
                
                </div>
                <div>
                <input className='input' type='password' placeholder='confirm_password'
                 onChange={(e)=>{setUser({...user,confirm_password: e.target.value})}} 
                 name="confirm password"/>
                </div>
                <div>
                    <button onClick={registration}> SignUp</button>
                </div>

            </section>
        </div>
    );
};

export default Signup;