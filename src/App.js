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
import Account from './Account'
import _Storage from './Storage'
import Shop from './Shop'
import ProductDetail from './ProductDetail'
import Buy from './Buy'
import { auth } from './firebase'
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged(function (currentAccount) {
      if (!currentAccount) {
        history.replace('/')
      }
    })
  })

  return (
    <ChakraProvider>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/account" component={Account} />
          <Route path="/account/upload" component={Upload} />
          <Route path="/account/storage" component={_Storage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/shop/:productId" component={ProductDetail} />
          <Route path="/shop/:productId/buy" component={Buy} />
        </Switch>
      </div>
    </ChakraProvider>
  );
}

export default App;