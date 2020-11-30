import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, store } from './firebase'
import Navbar from './Navbar'

const Profile = () => {
    const history = useHistory()
    const [file,setFile] = useState(null)
    useEffect(()=>{
        console.log(auth.currentUser)
    }, [auth])

    function logout(){
        auth.signOut()
        history.replace('/login')
    }

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
    }





        return (
            <div>
                <Navbar />
                <button onClick={logout}>LOGOUT</button>
                <input type="file" id="file_choose" onChange={Choose}/>
                <button id="file_upload" onClick={Upload} >UPLOAD</button>
            </div>
        )
}

 export default Profile