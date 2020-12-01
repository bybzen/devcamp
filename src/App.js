import React, { useEffect } from 'react'
import './App.css';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom"
import Login from './Login'
import Home from './Home'
import Upload from './Upload'
import Profile from './Profile'
import _Storage from './Storage'
import Shop from './Shop'
import Statement from './Statement'
import QR from './Qrcode'
import { auth } from './firebase'


function App (){
  const history = useHistory()

  useEffect(()=>{
    auth.onAuthStateChanged(function(currentUser) {
      if (!currentUser) {
        history.replace('/')
      }
    })
  })

  return (
    <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/profile/upload" component={Upload} />
          <Route path="/profile/storage" component={_Storage} />
          <Route path="/shop" component={Shop} /> 
          <Route path="/statement" component={Statement} /> 
          <Route path="/QRCode" component={QR} /> 

        </Switch>        
    </div>
  );
}

export default App;