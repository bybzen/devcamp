import React from 'react'
import { auth, db, store} from './firebase'
import Navbar from './components/Navbar'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const Upload = () => {
    const[subject_code,setSubjectCode] = useState(null)
    const[subject_name,setSubjectName] = useState()
    const subjectCode =(e)=>{
        setSubjectCode(e.target.value)
    }
    const subjectName =(e)=>{
        setSubjectName(e.target.value)
    }
    const [file,setFile] = useState(null)
    const history = useHistory()
    const Choose = event => {
        const _file = event.target.files[0]
        if(_file!==null){
            setFile(_file)
        }
    }

    async function Upload() {
        const file_ref = store.ref(auth.currentUser.uid).child(file.name)
        await file_ref.put(file)
        const url = await file_ref.getDownloadURL()
        console.log(url)
        console.log(subject_code)
        await db.ref(`/users/${auth.currentUser.uid}/upload/${subject_code}`).set({
            link: url,
            name: subject_name
        })
        await db.ref(`/file/${subject_code}`).set({
            link: url,
            uid: auth.currentUser.uid,
            name: subject_name
        })
        alert('Upload Success')
    }

    const Back =()=>{
        history.replace('/profile')
    }


    return(
        <div>
            <Navbar/>
            <p>subject Code</p>
            <input type='text' onChange={subjectCode} ></input>
            <br></br>
            <p>subject name</p>
            <input type='text' onChange={subjectName} ></input>
            <br></br><br></br>
            <input type="file" id="file_choose" onChange={Choose}/>
            <br></br><br></br>
            <button id="file_upload" onClick={Upload} >UPLOAD</button>
            <p>                 </p>
            <button onClick={Back}>Back</button>
        </div>
    )
}

export default Upload