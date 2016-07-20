import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Login from './Login.jsx'
import TaskView from './TaskView.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allTasks: [
        'dishes',
        'walk dog',
        'laundry',
        'other stuff'
      ]
    };
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <div>
          <TaskView tasks={this.state.allTasks}/>
        </div>
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
