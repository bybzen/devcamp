import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div>
            <Navbar />
            <body className="body">
                <button type='button' className="button1">
                    <Link to="/login" style={{textDecoration: "none", color: "white"}}>LOGIN</Link>
                </button>
                
                <p></p>
                <button type='button' className="button1">SUBMIT</button>
            </body>
        </div>
    )
}
