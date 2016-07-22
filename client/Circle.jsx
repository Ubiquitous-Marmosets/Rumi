import React from 'react';
import Paper from 'material-ui/Paper';

let style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden'
};

class Circle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      due: this.props.due,
      overdue: this.props.overdue
    }
  }

  componentWillMount() {
    this.state.overdue ? (style.border = '2px solid red') : (style.border = '2px solid yellow');
  }

  render() {
    let completeTask = () => {
      socket.emit('complete task', '1');
    };

    return (
      <div>
        <Paper
          style={style}
          zDepth={3}
          circle={true}
          onTouchTap={completeTask}
        >
          <div className="innerCircleText">
            {this.state.name}
          </div>
        </Paper>
      </div>
    );
  }
}

export default Circle;
