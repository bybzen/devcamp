import React, { Component } from 'react';
import auth from '../firebase'

export class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      passowrd: '',
      currentUser: null,
      message: '',
      userID: ''
    }
  }

  onChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          currentUser: response.user
        })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    })
  }

  logout = e => {
    e.preventDefault()
    auth.signOut().then(response => {
      this.setState({
        currentUser: null
      })
    })
  }
  render() {

    const { message, currentUser } = this.state

    if (currentUser) {
      return (
        <div>
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      )
    }


    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <p> login  </p>
          <p> Email <input
            type="email"
            name="email"
            onChange={this.onChange}
          />    </p>

          <p> Password <input
            type="password"
            name="password"
            onChange={this.onChange}
          />  </p>

          <p></p>
          <button >LOGIN</button>
        </form>

      </div>

    );
  }

}

export default Login;