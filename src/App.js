import React, { useEffect, useState } from 'react'
import './App.css';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom"
import Login from './components/login'
import Home from './Home';
import Profile from './profile'
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
        </Switch>        
    </div>
  );
}

export default App;