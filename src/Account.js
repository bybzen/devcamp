import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, db } from './firebase'
import Navbar from './components/Navbar'
import './css/App.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider, Button
} from "@chakra-ui/react"


const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        uid: '',
        qr_bank: ''
    })
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged(function (currentUser) {
            if (currentUser) {
                console.log(currentUser)
                db.ref('/users/' + auth.currentUser.uid).once('value').then((snapshot) => {
                    setUser({
                        name: snapshot.val().name,
                        qr_bank: snapshot.val().qr_bank,
                        email: snapshot.val().email,
                        uid: auth.currentUser.uid
                    })
                    localStorage.setItem('uid', auth.currentUser.uid)
                })
            }
        })
    }, [auth])
    function logout() {
        auth.signOut()
        history.replace('/')
    }

    function goUpload() {
        history.replace('/account/upload')
    }

    function goStorage() {
        history.replace('/account/storage')
    }

    function goShop() {
        history.replace('/shop')
    }


    return (
        <>
            <div>
                <Navbar />

                <Menu>
                    <MenuButton  as={Button} bg="#A0AEC0" >
                        Menu
                </MenuButton>
                    <MenuList>
                        <MenuGroup>
                        <MenuItem onClick={goStorage} > คลังสรุป </MenuItem>
                            <MenuItem onClick={goUpload} > อัปโหลด</MenuItem>
                            
                            <MenuItem onClick={goShop} > ร้านค้า </MenuItem>
                            <MenuItem onClick={logout} > ออกจากระบบ </MenuItem>
                        </MenuGroup>
                        <MenuDivider />

                    </MenuList>
                </Menu>

                <div>
                    <p className="">uid : {user.uid}</p>
                    <p>name : {user.name}</p>
                    <p>email : {user.email}</p>
                    <p>qr_bank : {user.qr_bank}</p>
                </div>
                <button className="select_button" onClick={goUpload}>UPLOAD</button>
                <button className="select_button" onClick={goStorage}>STORAGE</button>
                <button className="select_button" onClick={goShop}>SHOP</button>
                <button className="select_button" onClick={logout}>LOGOUT</button>
            </div>

            

        

        </>
    )
}

export default Profile