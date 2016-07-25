import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, Link } from 'react-router'
//import Login from './Login.jsx'

// Necessary for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Necessary for simple Mobile/Web click functionality on components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Provides 'a few seconds ago' and 'in 2 hours' to time Data
import moment from 'moment';

// Components we have built
import Navbar from './Navbar.jsx';
import Task from './Task.jsx';
import Comp from './Comp.jsx';
import AddTask from './AddTask.jsx';

import urgency from './urgency.service';
import socket from './socketio.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      overdueTasks: [],
      recentTasks: [],
      urgentTasks: [],
      completedTasks: []
    };
  }

  componentWillMount() {
    socket.emit('get all tasks');
    socket.emit('get completeds');
  }

  componentDidMount() {
    socket.on('sending all tasks', function(tasks) {

      var t = urgency.prioritizeTasks(tasks);

      this.setState({
        overdueTasks: t.overdue,
        urgentTasks: t.urgent,
        recentTasks: t.recent
      });
    }.bind(this));


    socket.on('sending completeds', completedTasks => {
      this.setState({completedTasks});
    });

    socket.on('create task', newTask => {
      socket.emit('get all tasks');
    });

    socket.on('complete task', function(completedTask) {
      socket.emit('get all tasks');

      var cs = this.state.completedTasks;
      cs.unshift(completedTask);

      this.setState({
        completedTasks: cs
      });
    }.bind(this));


  }

  render() {

    return (
      <MuiThemeProvider className="container">
        <div>
          <Navbar />

          <div className="row">
            <div className="col-xs-2 col-xs-offset-5">
              <AddTask/>
            </div>
            <div className="col-xs-12">
              {/* Create the overdueTask bubbles */}
              {this.state.overdueTasks.map(overdueTask => {
                return (
                  <div className="col-xs-3">
                    <Task
                      id={overdueTask.id}
                      name={overdueTask.name}
                      due={moment().endOf(overdueTask.dueBy).fromNow()}
                      color={0}
                      key={overdueTask.id}
                    />
                  </div>
                );
              })}

              {/* Create the urgentTask bubbles */}
              {this.state.urgentTasks.map(urgentTask => {
                return (
                  <div className="col-xs-3" key={urgentTask.id}>
                    <Task
                      id={urgentTask.id}
                      name={urgentTask.name}
                      due={moment().endOf(urgentTask.dueBy).fromNow()}
                      color={1}
                      />
                  </div>
                );
              })}

              {/* Create the recentTask bubbles */}
              {this.state.recentTasks.map(recentTask => {
                return (
                  <div className="col-xs-3" key={recentTask.id}>
                    <Task
                      id={recentTask.id}
                      name={recentTask.name}
                      due={moment().endOf(recentTask.dueBy).fromNow()}
                      overdue={2}
                      />
                  </div>
                );
              })}
            </div>
          </div>

            {/*
              Scrapping this button due to unnecessary time spent styling:
              Proposal: add it to the drop down in the top right or at the top
              That way it will only have sign out and create a task
              Better in terms of MVP, as opposed to real use

              <div className="col-xs-2">
                <div className="showAll" onTouchTap={test}></div>
              </div>

            */}

          {/* Create the completedTasks cards */}
          {this.state.completedTasks.map(completed => {
            return (
              <Comp
                name={completed.task.name}
                due={moment(completed.createdAt).fromNow()}
                user={completed.user.name}
                key={completed.id}
              />
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
