import React from "react";
import { useState } from "react";
import { login } from "../api/authAPI";
import Auth from '../utils/auth';


const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const formSubmit = async (event) => {
        event.preventDefault();
        const user = {
            username,
            password
        }
        // store userdata in local storage, look for the utils folder that should be a good start
        try {
            const data = await login(user);
            Auth.login(data.token);
            console.log('login successful', data.token)
          } catch (err) {
            console.error('Failed to login', err);
          }
    }


    return(
        <>
        <form onSubmit={formSubmit}>
        <label htmlFor="username"> </label>
        <input id="username" type="text" placeholder="username?" name="username" onChange={(event) => setUsername(event.target.value)}> 
        </input>
        <label htmlFor="password"> </label>
        <input id="password" type="text" placeholder="password?" name="password" onChange={(event) => setPassword(event.target.value)}>
        </input>
        <button type="submit">Login!</button>
        </form>
        </>
    )
   
}

export default SignIn;