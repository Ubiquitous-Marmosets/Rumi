import React from 'react';
import TaskViewEntry from './TaskViewEntry.jsx'

const TaskView = (props) => (
  <div>
    <h1>Task View</h1>
    {props.tasks.map(task =>
      <TaskViewEntry task={task}/>)}
  </div>
)

export default TaskView;
