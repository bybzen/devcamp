import React,{ useEffect, useState } from 'react'
import { auth, db} from './../firebase'
import './../App.css'

function DownloadList(){

    const[downloadList,setDownloadList] = useState({
        subject_code:[],
        link:[],
        list:{}
    })

    const fetchDownload = async () => {
        db.ref(`/users/${auth.currentUser.uid}/download/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setDownloadList({
                subject_code: Object.keys(data),
                link: Object.values(data),
                list: data
                })
            }
        })
    }

    useEffect(()=> {
        fetchDownload()
    },db.ref(`/users/${auth.currentUser.uid}/download/`))

    return(
        <div>
            <p>Download</p>
            {downloadList.subject_code.map((key, index) => {
                return ( 
                <li key={index}>{`suject code : ${key}`} link : 
                <a className='download' onClick={() => window.location.href  = downloadList.link[index]}>download</a>
                </li>)
                })
            }   
        </div>
    )
    
}

export default DownloadList