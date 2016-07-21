import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import Login from './Login.jsx'
import TaskView from './TaskView.jsx'

import Task from './Task.jsx';
import Completed from './Completed.jsx';


import { Panel } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';


var data = require('./fakeData');
// Somehow determines the 5 or fewer most urgent tasks to be complete
// For test purposes, I will only show 2 as being urgent.
var urgentTasks = data.allTasks;//.slice(0, 2);
var completedTasks = data.allCompletedTasks;


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
      <div className="container-fluid">
        <div>
          Create task
        </div>
        <div className="row center-block">
          <div className="col-xs-9">
            {this.state.urgentTasks.map((urgentTask, i) => {
              var urgentTaskName = urgentTask.name;
              var urgentTaskDueBy = urgentTask.dueBy;

              return (
                <Task name={urgentTaskName} dueBy={urgentTaskDueBy} key={i}/>
              );
            })}
          </div>
          <div className="col-xs-3 circle all">
            all
          </div>
        </div>


        <div className="row center-block">
          <Accordion>
            {this.state.completedTasks.map((completedTask, i) => {
              var completedTaskUserID = completedTask.userId;
              var completedTaskTaskID = completedTask.taskId;
              return (
                <Panel header={completedTaskUserID} bsStyle="danger" eventKey={i} >
                  go head tell me im wrong
                </Panel>
              );
            })}
          </Accordion>
        </div>

        <Accordion>
          <Panel header="sucka" bsStyle="info" eventKey="1">fight me mofo</Panel>
          <Panel header="panel2" bsStyle="info" eventKey="2">fight me mofo2</Panel>
          <Panel header="panel2" bsStyle="info" eventKey="3">fight me mofo2</Panel>
          <Panel header="panel2" bsStyle="info" eventKey="4">fight me mofo2</Panel>
        </Accordion>

      </div>
    );
  }

}

ReactDOM.render(<App/>, document.getElementById('app'));

// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}/>
//     <Route path="login" component={Login}/>
//   </Router>),
// document.getElementById('app'));
