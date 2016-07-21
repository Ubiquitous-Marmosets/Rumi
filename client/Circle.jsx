import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

let test = () => {
  console.log('button hit');
};

/*
  props: {
    urgentTasK: String
  }
*/
const Circle = ({name, dueBy}) => (
  <Paper style={style} zDepth={3} circle={true} onTouchTap={test}>
    <div className="baby">
      {name}
    </div>
  </Paper>
);

export default Circle;
