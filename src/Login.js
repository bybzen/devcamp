import React, { useEffect, useState } from 'react';
import {auth} from './firebase'
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar'


const Login = () => {
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    passowrd: ''
  })

  const onChange = e => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const { email, password } = state
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        history.replace('/account')
      })
      .catch(error => {
        alert('Error in login', error)
      })
  }

  useEffect(()=>{
    auth.onAuthStateChanged(function(currentUser) {
      if (currentUser) {
        history.replace('/account')
      }
    })
  })

  return (
    <div>
      <Navbar />
      <form onSubmit={onSubmit}>
        <p> login  </p>
        <p> Email <input
          type="email"
          name="email"
          onChange={onChange}
        />    </p>

        <p> Password <input
          type="password"
          name="password"
          onChange={onChange}
        />  </p>

        <p></p>
        <button type='submit'>LOGIN</button>
      </form>

    </div>

  );

}

export default Login;