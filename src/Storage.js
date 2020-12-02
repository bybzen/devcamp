import React from 'react'
import { useHistory } from 'react-router-dom'
import './App.css'
import Upp from './components/UploadList'
import Dww from './components/DownloadList'

const Storage = () =>{

    const style ={
        backgroundColor: "#e3e3e3",
    }
   
    const history = useHistory()
    function goback(){
        history.replace('/profile')
    }

    return(
        <div>
            <button onClick={goback}>BACK</button>
            <div>
                <div className="container-sm">
                    <div class="col-sm-6" style="width: 50%;">
                        <div className="row"></div>
                    </div>
                            <div className="row subjectDetial" style={{ backgroundColor: 'black' }}>
                                <div>
                                    <Upp/>
                                </div>
                                <div>   
                                    <Dww/>
                                </div>
                            </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Storage