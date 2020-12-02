import React,{ useEffect, useState } from 'react'
import { db } from './../firebase'
import './../App.css'

function DownloadList(){

    const[downloadList,setDownloadList] = useState({
        subject_code:[]
    })

    const fetchDownload = async () => {
         db.ref(`/users/${localStorage.uid}/download/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setDownloadList({
                    subject_code: Object.keys(data),
                    data: data
                })
            }
        })
    }

    useEffect(()=> {
        fetchDownload()
    },db.ref(`/users/${localStorage.uid}/download/`))

    return(
        <div>
            
            {downloadList.subject_code.map((key, index) => {
        return ( 
        <li key={index}>{`subject code : ${key}`} Subject name : {downloadList.data[key].name}link : 
        <br></br>
        <a className='select_button' onClick={() => window.location.href  = downloadList.data[key].fileUrl}>download</a>
        </li>)
        })

            }   
        </div>
    )
    
}

export default DownloadList