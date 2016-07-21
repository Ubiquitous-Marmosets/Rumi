import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Login from './Login.jsx'
import TaskView from './TaskView.jsx'
import AddTask from './AddTask.jsx'

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

  handleAddNewTask(taskName, dueDate) {
    // this function will handle
    // posting new task to db &
    // add to pending tasks
    // how to implement???
    console.log('taskName:', taskName);
    console.log('dueDate:', dueDate);
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
          <AddTask onAddNewTask={this.handleAddNewTask.bind(this)}/>
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
