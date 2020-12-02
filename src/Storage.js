import React from 'react'
import { useHistory } from 'react-router-dom'
import './App.css'
import Upp from './components/UploadList'
import Dww from './components/DownloadList'
import { Button, Nav } from 'react-bootstrap'
// import { CartFill } from 'react-bootstrap-icons'
import Navbar from './components/Navbar'

const Storage = () => {

    const style = {
        backgroundColor: "#e3e3e3",
    }

    const history = useHistory()
    function goback() {
        history.replace('/account')
    }

    return (
        <div>
            <Navbar />
            <br></br>

            <Upp />
            <Dww />

            <header style={{ backgroundColor: 'yellow' }}>


                {/* First Navbar */}
                {/* <h1 style={{ margin: 0, color: "white", textAlign: "center" }}> PAPOY. </h1> */}
               
                <hr />
                <div style={{
                    background: 'pink',
                    color: 'black',
                    padding: '10px 20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2>คลัง</h2>
                    {/* <CartFill size={40} /> */}
                </div>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/home">ดาวน์โหลด</Nav.Link>

                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/about">อัปโหลด</Nav.Link>

                    </Nav.Item>
                </Nav>


            </header>


            <button className="cancel" onClick={goback}>BACK</button>
        </div>
    )
}

export default Storage