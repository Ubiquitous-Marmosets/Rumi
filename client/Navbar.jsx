import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import AddTask from './AddTask.jsx';

let test = () => {
  console.log('button hit');
};

let stopClose = (e) => {
  e.preventDefault()
}

const Navbar = () => (
  <AppBar
    showMenuIconButton={false}
    title="Rumi"
    iconElementRight={
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem onTouchTap={test} primaryText="Sign out" />
      </IconMenu>
    }
  />
);

export default Navbar;
