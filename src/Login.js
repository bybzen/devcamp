import React, { useEffect, useState } from 'react';
import { auth } from './firebase'
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar'
import './css/App.css'


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

  useEffect(() => {
    auth.onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        history.replace('/account')
      }
    })
  })

  return (
    <>

      <div>

        <Navbar />


        <form onSubmit={onSubmit}>
          {/* <fieldset> */}
            <legend>
              <p class="text2"><h3>เข้าสู่ระบบ</h3></p>
            </legend>

            <p class="text1">อีเมล<input class="inputBox"

              type="email"
              name="email"
              onChange={onChange}
            />    </p>

            <p class="text1">รหัสผ่าน <input class="inputBox"
              type="password"
              name="password"
              onChange={onChange}
            />  </p>

            <p></p>


          
            {/* <button type="button" class="button">สมัครสมาชิก</button> */}

          {/* </fieldset> */}

          <br></br>
          <button type="submit" className="button">เข้าสู่ระบบ</button>

        </form>

      </div>

    </>

  );

}

export default Login;