import React from 'react';
import ReactDOM from 'react-dom';

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
      now: Date.now(),
      overdueTasks: [],
      recentTasks: [],
      urgentTasks: [],
      completedTasks: []
    };

    setInterval(() => {
      this.setState({now: Date.now()});

      let allTasks = [].concat(this.state.urgentTasks, this.state.recentTasks, this.state.overdueTasks);
      this.reprioritize(allTasks);
    }, 1000*60); // update every minute
  }

  reprioritize(tasks) {
    var t = urgency.prioritizeTasks(tasks);

    this.setState({
      overdueTasks: t.overdue,
      urgentTasks: t.urgent,
      recentTasks: t.recent
    });
  }

  componentWillMount() {
    socket.emit('get all tasks');
    socket.emit('get completeds');
  }

  componentDidMount() {
    socket.on('sending all tasks', this.reprioritize.bind(this));

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
                      due={moment().endOf(recentTask.dueBy).from(this.state.now)}
                      overdue={2}
                      />
                  </div>
                );
              })}
            </div>
          </div>

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
