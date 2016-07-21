import React from 'react';

var moment = require('moment');

var Completed = (props) => (
  <div className="col-xs-10 col-xs-offset-1 text-center bar">
    User{props.userId} Completed {props.taskId}
    <span className="gray">
      {moment().endOf(props.dueBy).fromNow()}
    </span>
  </div>
);

export default Completed;
