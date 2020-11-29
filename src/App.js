import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/login'
import Home from './Home';




function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />

        </Switch>        
      </Router>
    </div>
  );
}

export default App;