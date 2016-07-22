import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, Link } from 'react-router'
//import Login from './Login.jsx'

// Necessary for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Necessary for simple Mobile/Web click functionality on components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import moment from 'moment';

// Components we have built
import Navbar from './Navbar.jsx';
import Circle from './Circle.jsx';
import Comp from './Comp.jsx';

/* Test Data inserted here */
let fake = require('./fakeData');
let urgency = require('./urgency.service');

// var completedTasks = urgency.prioritizeTasks([fake.allTasks]);
// var urgentTasks = urgency.prioritizeTasks([fake.allTasks]);
// var overdueTasks = urgency.prioritizeTasks([fake.allTasks]);

class App extends React.Component {
  constructor() {
    super();

    let allTasks = urgency.prioritizeTasks(fake.allTasks);

    this.state = {
      overdueTasks: allTasks.overdue,
      urgentTasks: allTasks.urgent,
      completedTasks: allTasks.recent,
    }
  }

  render() {

    return (
      <MuiThemeProvider className="container">
        <div>
          {console.log('overdue', this.state.overdueTasks)}
          {console.log('urgent', this.state.urgentTasks)}
          {console.log('completed', this.state.completedTasks)}
          <Navbar />

          <div className="row">
            <div className="col-xs-12">
              {/* Create the overdueTask bubbles */}

              {this.state.overdueTasks.map((overdueTask, i) => {
                return (
                  <div className="col-xs-2" key={i}>
                    <Circle
                      id={overdueTask.id}
                      name={overdueTask.name}
                      due={moment().endOf(overdueTask.dueBy).fromNow()}
                      overdue={true}
                    />
                  </div>
                );
              })}

              {/* Create the urgentTask bubbles */}

              {this.state.urgentTasks.map((urgentTask, i) => {
                return (
                  <div className="col-xs-2" key={i}>
                    <Circle
                      id={urgentTask.id}
                      name={urgentTask.name}
                      due={moment().endOf(urgentTask.dueBy).fromNow()}
                      overdue={false}
                      />
                  </div>
                );
              })}
            </div>
            {/*
              Scrapping this button due to unnecessary time spent styling:
              Proposal: add it to the drop down in the top right
              That way it will only have sign out and create a task

              <div className="col-xs-2">
                <div className="showAll" onTouchTap={test}></div>
              </div>

            */}
          </div>

          {/* Create the completedTasks cards */}

          {this.state.completedTasks.map((completedTask, i) => {
            return (
                <Comp
                  id={completedTask.id}
                  name={completedTask.name}
                  due={moment().startOf(completedTask.dueBy).fromNow()}
                  user={'Trevor'}
                />
            );
          })}

          {/*this.state.completedTasks.map((completedTask, i) => {
            let completedTaskName = completedTask.userId;
            let completedTaskUser = completedTask.taskId;
            return (
              <Comp task={completedTaskName} user={completedTaskUser} key={i}/>
            );
          })*/}
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
