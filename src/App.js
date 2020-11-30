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
import { auth } from './firebase'


function App (){
  const history = useHistory()

  useEffect(()=>{
    auth.onAuthStateChanged(function(currentUser) {
      if (!currentUser) {
        history.replace('/login')
      }
    })
  }, [])

  return (
    <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/profile/upload" component={Upload} />
        </Switch>        
    </div>
  );
}

export default App;