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
import Profile from './profile'
import _Storage from './Storage'
import Shop from './Shop'
import ProductDetail from './ProductDetail'
import Buy from './Buy'
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
          <Route exact path="/shop" component={Shop} /> 
          <Route exact path="/shop/:productId" component={ProductDetail} /> 
          <Route path="/shop/:productId/buy" component={Buy} />
        </Switch>        
    </div>
  );
}

export default App;