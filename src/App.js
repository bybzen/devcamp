import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Login from './components/login'



function App() {

  function goLogin(){
      
  }

  return (
    <div>
      <Navbar/>
      <img src="/images/main.jpg" alt="main.jpg" width="100%" height="10%"/>
      <p></p>
      
      <BrowserRouter>

      
    

      <body className="body">
        <button type='button' className="button1" onClick={Login}>LOGIN</button>
        <p></p>
        <button type='button' className="button1">SUBMIT</button>
      </body>

      </BrowserRouter>
      
      
    </div>

  );
}

export default App;