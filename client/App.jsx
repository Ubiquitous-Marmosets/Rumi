import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Login/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
