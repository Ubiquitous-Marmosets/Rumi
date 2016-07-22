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

/* Test Data inserted here */
//let fake = require('./fakeData');

let urgency = require('./urgency.service');

/* Necessary for original run, to create some tasks in the database.
    let allTasks = fake.allTasks;
    import createFakeTasks from './createTasks';
    createFakeTasks(allTasks);
*/

let hours = n => 1000*60*60*n;
let days = n => hours(n) * 24;
let cl = console.log.bind(console);

import socket from './socketio.js';
//console.log(socket);
//socket.on('sending all tasks', cl);

// import socket from './socketio.js'
//
// window.socket = socket;
//console.log(socket);

//socket.on('getAllTasks')

//socket.emit()

class App extends React.Component {
  constructor() {
    super();

  //   let allTasks = urgency.prioritizeTasks(fake.allTasks);
      this.state = {
        overdueTasks: [],
        recentTasks: [],
        urgentTasks: [],
        completedTasks: []
      };
  //   this.state = {
  //     overdueTasks: allTasks.overdue,
  //     urgentTasks: allTasks.urgent,
  //     recentTasks: allTasks.recent,
  //     completedTasks: []
  //   }
  }

  componentWillMount() {
    socket.emit('get all tasks');
  }

  render() {

    socket.on('sending all tasks', function(tasks) {

      var t = urgency.prioritizeTasks(tasks);
      console.log('1234123412341234', t);

      this.setState({
        overdueTasks: t.overdue,
        recentTasks: t.recent,
        urgentTasks: t.urgent,
        completedTasks: []
        //t.recent
        //Tasks: t.recent
      });

      //this.setState(allTasks);

      //console.log(this.state);
    }.bind(this));

    socket.on('complete task', function(completedTask) {

      var cs = this.state.completedTasks;

      // console.log('111111111111', cs);
      cs.push(completedTask);
      // console.log('222222222222', cs);

      //
      // console.log(cs);
      // console.log(completedTask);
      //
      this.setState({
        completedTasks: cs
      });
      console.log(completedTask);
    }.bind(this))

    return (
      <MuiThemeProvider className="container">
        <div>

          {/* If you want to see a client side log of state */}
          {console.log('overdue', this.state.overdueTasks)}
          {console.log('urgent', this.state.urgentTasks)}
          {console.log('completed', this.state.completedTasks)}

          <Navbar />

          <div className="row">
            <div className="col-xs-2 col-xs-offset-5">
              <AddTask/>
            </div>
            <div className="col-xs-12">
              {/* Create the overdueTask bubbles */}
              {this.state.overdueTasks.map((overdueTask, i) => {
                return (
                  <div className="col-xs-2" key={i}>
                    <Task
                      id={overdueTask.id}
                      name={overdueTask.name}
                      due={moment().endOf(overdueTask.dueBy).fromNow()}
                      overdue={0}
                    />
                  </div>
                );
              })}

              {/* Create the urgentTask bubbles */}
              {this.state.urgentTasks.map((urgentTask, i) => {
                return (
                  <div className="col-xs-2" key={i}>
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
              {this.state.recentTasks.map((recentTask, i) => {
                return (
                  <div className="col-xs-3" key={i}>
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
          {this.state.completedTasks.map((completedTask, i) => {
            return (
              <Comp
                id={completedTask.id}
                name={completedTask.name}
                due={moment().startOf(completedTask.dueBy).fromNow()}
                user={'Trevor'}
                key={i}
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
