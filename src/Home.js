import React from 'react'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'
import './css/App.css'



export default function Home() {
    return (
        <div>
            <Navbar />
            <body className="body">
            {/* <button type="submit" class="button">เข้าสู่ระบบ</button> */}
                <button type='button' className="button">
                    <Link to="/login" style={{textDecoration: "none", color: "white"}}>เข้าสู่ระบบ</Link>
                </button>
                
                <br></br><br></br>
                <button type='button' className="button">สมัครสมาชิก</button>
            </body>
        </div>
    )
}
