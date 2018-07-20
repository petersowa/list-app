import React, {Component} from 'react';
import './styles/App.css';
import {Animate} from './Animate/Animate';

import TodoApp from './Todo';

class App extends Component {
  render() {
    return (
      <div className="App fade">
        <Animate hide={false}>
          <header className="App-header">
            <span className="App-title">A Todo List</span>
          </header>
        </Animate>
        <TodoApp />
      </div>
    );
  }
}

export default App;
