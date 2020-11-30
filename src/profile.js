import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from './firebase'

const Profile = () => {
    const history = useHistory
    useEffect(()=>{
        console.log(auth.currentUser)
    }, [auth.currentUser])

function logout(){
    auth.signOut()

}
    return (
        <div>
            <button onClick='logout'>LOGOUT</button>
            <input type="file" id="file_upload" />
        </div>
    )
}

export default Profile