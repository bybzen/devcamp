import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, store, db} from './firebase'
import Navbar from './Navbar'

const Profile = () => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        uid:'',
        qr_bank:''
    })
    const history = useHistory()
    const [file,setFile] = useState(null)

    useEffect(()=>{
        auth.onAuthStateChanged(function(currentUser) {
          if (currentUser) {
            console.log(currentUser)
            db.ref('/users/'+auth.currentUser.uid).once('value').then((snapshot)=>{
                setUser({
                    name: snapshot.val().name,
                    qr_bank: snapshot.val().qr_bank,
                    email: snapshot.val().email,
                    uid: auth.currentUser.uid
                })
            })
            }
        })
    },[auth])
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
                <div>
                    <p>uid : {user.uid}</p>
                    <p>name : {user.name}</p>
                    <p>email : {user.email}</p>
                    <p>qr_bank : {user.qr_bank}</p>
                </div>
            </div>
        )   
}

 export default Profile