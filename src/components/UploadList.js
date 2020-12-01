import React,{ useEffect, useState } from 'react'
import { auth, db} from './../firebase'
import './../App.css'

function UploadList({authCode}){

    const[uploadList,setUploadList] = useState({
        subject_code:[],
        link:[],
        Subjectname:[],
    })

    const fetchUpload = async () => {
        const uid = localStorage.getItem('uid')
        db.ref(`/users/${uid}/upload/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setUploadList({
                subject_code: Object.keys(data),
                link: data['link'],
                subjectname: data['name'],
                data: data
                })
            }
        })
    }

    useEffect(()=> {
        fetchUpload()
    },db.ref(`/users/${localStorage.getItem('uid')}/upload/`))

    return(
        <div>
            <p>Upload</p>
            {uploadList.subject_code.map((key, index) => {
        return ( 
        <li key={index}>{`subject code : ${key}`} Subject name : <p>{uploadList.data[key].name}</p>link : 
        <a className='download' onClick={() => window.location.href  = uploadList.data[key]['link']}>download</a>
        </li>)
        })

            }   
        </div>
    )
    
}

export default UploadList