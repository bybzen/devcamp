import React from 'react'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div>
            <Navbar />
            <body className="body">
                <div className="container">
                    <Link to="/login" style={{textDecoration: "none", color: "white"}}>LOGIN</Link>
                    <button type='button' className="button1">
                    </button>
                </div>
                
                   
                
                
                <p></p>
                <button type='button' className="button1">SUBMIT</button>
            </body>
        </div>
    )
}
