import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

let style = {
  padding: '6px',
};

const Comp = ({id, name, due, user}) => (
  <Card>
    <CardHeader
      title={name}
      subtitle={`Completed by ${user} ${due}`}
      avatar="http://lorempixel.com/100/100/nature/"
      style={style}
    />
  </Card>
);

export default Comp;


// actAsExpander={true}
// showExpandableButton={true}
// <CardText expandable={true}>
//   {`${user} completed ${name} ${due}`}
// </CardText>
