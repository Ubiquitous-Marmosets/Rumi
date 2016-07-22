import React from 'react';
import Paper from 'material-ui/Paper';
import socket from './socketio.js';

let style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden'
};

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      due: this.props.due,
      color: this.props.color
    }
  }

  componentWillMount() {
    if (this.state.color === 0) {
      style.border = '2px solid red';
    } else if (this.state.color === 1) {
      style.border = '2px solid yellow';
    } else {
      style.border = '2px solid green';
    }
  }

  render() {
    
    let completeTask = () => {
      socket.emit('complete task', this.state.id);
    };

    return (
      <div>
        <Paper
          style={style}
          zDepth={3}
          circle={true}
          onTouchTap={completeTask}
        >
          <div className="innerTaskText">
            {this.state.name}
          </div>
        </Paper>
      </div>
    );
  }
}

export default Task;
