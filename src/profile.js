import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, db} from './firebase'
import Navbar from './components/Navbar'
import './css/App.css'

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
        history.replace('/')
    }

    function goUpload(){
        history.replace('/profile/upload')
    }

    function goStorage(){
        history.replace('/profile/storage')
    }

    function goShop(){
        history.replace('/shop')
    }

    
        return (
            <div>
                <Navbar />
                
                <div>
                    <p className="text1">uid : {user.uid}</p>
                    <p>name : {user.name}</p>
                    <p>email : {user.email}</p>
                    <p>qr_bank : {user.qr_bank}</p>
                </div>
                <button onClick={goUpload}>UPLOAD</button>
                <button onClick={goStorage}>STORAGE</button>
                <button onClick={goShop}>SHOP</button>
                <button onClick={logout}>LOGOUT</button>
            </div>
        )   
}

 export default Profile