import React,{ useEffect, useState } from 'react'
import { auth, db} from './../firebase'
import './../App.css'

function DownloadList(){

    const[downloadList,setDownloadList] = useState({
        subject_code:[],
        link:[],
        Subjectname:[],
    })

    const fetchDownload = async () => {
         db.ref(`/users/${localStorage.getItem('uid')}/download/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setDownloadList({
                    subject_code: Object.keys(data),
                    link: data['link'],
                    subjectname: data['name'],
                    data: data
                })
            }
        })
    }

    useEffect(()=> {
        fetchDownload()
    },db.ref(`/users/${localStorage.getItem('uid')}/download/`))

    return(
        <div>
            <p>Upload</p>
            {downloadList.subject_code.map((key, index) => {
        return ( 
        <li key={index}>{`subject code : ${key}`} Subject name : <p>{downloadList.data[key].name}</p>link : 
        <a className='download' onClick={() => window.location.href  = downloadList.data[key]['link']}>download</a>
        </li>)
        })

            }   
        </div>
    )
    
}

export default DownloadList