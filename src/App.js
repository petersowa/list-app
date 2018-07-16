import React, {Component} from 'react';
import logo from './logo.svg';
import './styles/App.css';
import {Animate} from './Animate/Animate';

import TodoApp from './Todo';

class App extends Component {
  render() {
    return (
      <div className="App swing">
        <Animate hide={false}>
          <header className="App-header">
            <span className="App-title">A Todo List</span>
          </header>
        </Animate>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TodoApp />
      </div>
    );
  }
}

export default App;
