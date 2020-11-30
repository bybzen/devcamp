import React,{ useEffect, useState } from 'react'
import { auth, db} from './../firebase'
import './../App.css'

function UploadList(){

    const[uploadList,setUploadList] = useState({
        subject_code:[],
        link:[],
        list:{}
    })

    const fetchUpload = async () => {
        db.ref(`/users/${auth.currentUser.uid}/upload/`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if(data){
                setUploadList({
                subject_code: Object.keys(data),
                link: Object.values(data),
                list: data
                })
            }
        })
    }

    useEffect(()=> {
        fetchUpload()
    },db.ref(`/users/${auth.currentUser.uid}/upload/`))

    return(
        <div>
            <p>Upload</p>
            {uploadList.subject_code.map((key, index) => {
        return ( 
        <li key={index}>{`suject code : ${key}`} link : 
        <a className='download' onClick={() => window.location.href  = uploadList.link[index]}>download</a>
        </li>)
        })

            }   
        </div>
    )
    
}

export default UploadList