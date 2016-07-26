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

  completeTask () {
    socket.emit('complete task', this.state.id);
  }

  render() {

    let style2 = Object.assign({}, style);
    if (this.state.color === 0) {
      style2.border = '2px solid red';
    } else if (this.state.color === 1) {
      style2.border = '2px solid yellow';
    } else {
      style2.border = '2px solid green';
    }

    return (
      <div>
        <Paper
          style={style2}
          zDepth={3}
          circle={true}
          onTouchTap={this.completeTask.bind(this)}
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
