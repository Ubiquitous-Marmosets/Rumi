import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Comp = ({task, user}) => (
  <Card>
    <CardHeader
      title={task}
      subtitle={`Completed by ${user}`}
      avatar="http://lorempixel.com/100/100/nature/"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      Task: {task},
      User: {user},
      Date: '06/07/2016 at 12:35pm'
    </CardText>
  </Card>
);

export default Comp;
