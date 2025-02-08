import { Link } from "react-router-dom" 
import React from "react"

export default function Navbar(){
    return(
        <>
            <div className="h-24 bg-gray-50 flex items-center justify-center">
                <h2 className="font-bold text-xl"> <Link to='/'>Whats On Your Shelf</Link></h2>
                <div>
                    <ul className="flex flex-wrap ml-12 align-middle text-gray-800">
                        <li className="mr-4 hover:bg-blue-400 hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
                            <Link to='/signin'>Sign In</Link>
                        </li>
                        <li className="mr-4  hover:bg-blue-400 hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                        <li className="mr-4  hover:bg-blue-400 hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="mr-4  hover:bg-blue-400 hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
                            <Link to='/results'>Book Search</Link>
                        </li>
                        <li className="mr-4  hover:bg-blue-400 hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
                            <Link to='/library'>Library</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

