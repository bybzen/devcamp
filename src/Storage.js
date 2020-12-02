import React from 'react'
import { useHistory } from 'react-router-dom'
import './App.css'
import Upp from './components/UploadList'
import Dww from './components/DownloadList'

const Storage = () =>{

   
    const history = useHistory()
    function goback(){
        history.replace('/account')
    }

    return(
        <div>
            <Upp/>
            <Dww/>
            <button className="cancel" onClick={goback}>BACK</button>
        </div>
    )
}

export default Storage