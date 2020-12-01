import React from 'react'
import { auth, db, store} from './firebase'
import Navbar from './components/Navbar'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const Upload = () => {
    const[subject_code,setSubjectCode] = useState(null)
    const subjectCode =(e)=>{
        setSubjectCode(e.target.value)
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
        await db.ref(`/users/${auth.currentUser.uid}/upload/${subject_code}`).set(url)
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
            <input type="file" id="file_choose" onChange={Choose}/>
                
            <button onClick={Back}>Back</button>
        </div>
    )
}

export default Upload