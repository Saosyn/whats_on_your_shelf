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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={formSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-center text-2xl font-bold text-[#FF7272] mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username..."
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF7272] text-white font-semibold p-3 rounded-lg hover:bg-[#FF3737] transition"
        >
          Login
        </button>
      </form>
    </div>
    )
   
}

export default SignIn;