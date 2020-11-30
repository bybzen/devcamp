import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, db} from './firebase'
import Navbar from './components/Navbar'

const Profile = () => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        uid:'',
        qr_bank:''
    })
    const history = useHistory()

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

    function goUpload(){
        history.replace('/profile/upload')
    }




        return (
            <div>
                <Navbar />
                <button onClick={logout}>LOGOUT</button>
                <div>
                    <p>uid : {user.uid}</p>
                    <p>name : {user.name}</p>
                    <p>email : {user.email}</p>
                    <p>qr_bank : {user.qr_bank}</p>
                </div>
                <button onClick={goUpload}>UPLOAD</button>
            </div>
        )   
}

 export default Profile