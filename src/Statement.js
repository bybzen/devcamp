import React from 'react'
import Navbar from './components/Navbar';
import main from './images/main.jpg'
import { useHistory } from 'react-router-dom';


export default function Statement() {

    const history = useHistory()

    function goQRCode(){
        history.replace('/QRCode')
    }


    return (
        <div>
            <Navbar />


            <img title="Subject" src={main} alt="image" width="100%" height="300px" ></img>

            <h2> วิชา : </h2>

            <h2> รหัส : </h2>

            <h2> ราคารวม : 150 บาท</h2>

            
            
            <button ><a title="Buy"  href="http://192.168.102.24:3000/QRCode" target="_blank"> Buy </a></button>
            <br></br><br></br>

            {/* href="http://192.168.102.24:3000/QRCode" */}

            {/* onClick={goQRCode} */}

            
            <button >submit</button>
            

         





        </div>
    )
}
