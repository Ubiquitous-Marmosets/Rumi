import React from 'react';

import moment from 'moment';

var Task = (props) => (
  <div>

    <div className="col-xs-5 circle">
      <div>
        {props.name}
      </div>
    </div>

      {/*
      <div className="gray">
        {moment().endOf(props.dueBy).fromNow()}
      </div>
      */}

  </div>
);

export default Task;
