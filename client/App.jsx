import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Login from './Login.jsx'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render((  
  <Router> 
    <Route path="/" component={App}/>
    <Route path="login" component={Login}/>
  </Router>), 
document.getElementById('app'));
