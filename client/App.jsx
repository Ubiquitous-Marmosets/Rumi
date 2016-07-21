import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Login from './Login.jsx'

import Task from './Task.jsx';
import Completed from './Completed.jsx';


/* Test Data inserted here */
var data = require('./fakeData');
// Somehow determines the 5 or fewer most urgent tasks to be complete
var urgentTasks = data.allTasks;//.slice(0, 2);
var completedTasks = data.allCompletedTasks;


// Necessary for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Necessary for simple Mobile/Web click functionality on components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Components we have built
import Navbar from './Navbar.jsx';
import Circle from './Circle.jsx';
import Comp from './Comp.jsx';


//import Avatar from 'material-ui/Avatar';
//import Chip from 'material-ui/Chip';
//import FontIcon from 'material-ui/FontIcon';

//import AppBar from 'material-ui/AppBar';

let test = () => {
  console.log('test click worked');
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      urgentTasks: urgentTasks,
      completedTasks: completedTasks
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />

          <div className="row">
            <div className="col-xs-10">
              {/* Create the urgentTask bubbles */}
              {this.state.urgentTasks.map((urgentTask, i) => {
                let urgentTaskName = urgentTask.name;
                let urgentTaskDueBy = urgentTask.dueBy.toString();
                console.log(urgentTaskDueBy);
                return (
                  <div className="col-xs-3">
                    <Circle name={urgentTaskName} dueBy={urgentTaskDueBy} key={i}/>
                  </div>
                );
              })}
            </div>
            <div className="col-xs-2">
              <div className="showAll" onTouchTap={test}>
              </div>
            </div>
          </div>

          {/* Create the completedTasks cards */}
          {this.state.completedTasks.map((completedTask, i) => {
            let completedTaskName = completedTask.userId;
            let completedTaskUser = completedTask.taskId;
            return (
              <Comp task={completedTaskName} user={completedTaskUser} key={i}/>
            );
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

// Removed Routes for the sake of building the single App page.
// TODO: reconnect the app using routers.
// Curious to see how authentication plays into the current route scheme
// For instance, we take the user to the main view on load..
// Whereas I think we should be taking them to login/signup
// And later, redirect them to App View if their log in was successful.

// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}/>
//     <Route path="login" component={Login}/>
//   </Router>),
// document.getElementById('app'));
