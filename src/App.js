import './App.css';
import Navbar from './Navbar'
import Login from './components/login'
function App() {

  function goLogin(){

  }

  return (
    <div>
      <Navbar/>
        <body className="body">
          <button type='button' className="button1" onClick={goLogin}>LOGIN</button>
          <p></p>
          <button type='button' className="button1">SUBMIT</button>
        </body>      
    </div>
  );
}

export default App;