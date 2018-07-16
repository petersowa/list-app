import React, {Component} from 'react';
import {Animate, AnimateStyle} from './Animate/Animate';
import './styles/Todo.css';

class TodoApp extends Component {
  state = {
    todos: [
      {body: 'go to store', id: Date.now(), done: false},
      {body: 'buy milk', id: Date.now() + 1, done: true}
    ]
  };

  removeItem = todo => {
    this.setState({
      todos: [
        ...this.state.todos.map(e => {
          if (e.id !== todo.id) return e;
          return {...e, done: !e.done};
        })
      ]
    });
  };

  render() {
    return (
      <div className="TodoApp" style={{perspective: '100px'}}>
        <Animate hide={false}>
          <form
            onSubmit={event => {
              event.preventDefault();
              const value = event.target.elements.newTodo.value.trim();

              if (value === '') return;
              this.setState({
                todos: [
                  {
                    body: event.target.elements.newTodo.value,
                    id: Date.now(),
                    done: false
                  },
                  ...this.state.todos
                ]
              });
              event.target.elements.newTodo.value = '';
            }}
          >
            <label>Todo:</label>
            <input type="text" id="newTodo" />
            <button type="submit">Add</button>
          </form>
        </Animate>

        <h4>To Do Items</h4>
        <ul className="swing">
          {this.state.todos.map((todo, i) => {
            return (
              <Animate key={todo.id} hide={todo.done}>
                <li
                  onClick={event => {
                    this.removeItem(todo);
                  }}
                >
                  {todo.body}
                </li>
              </Animate>
            );
          })}
        </ul>

        <h4>Done Items</h4>
        <ul className="swing">
          {this.state.todos.map((todo, i) => {
            //if (todo.done === true) return null;
            return (
              <Animate key={todo.id} hide={!todo.done}>
                <li
                  onClick={event => {
                    this.removeItem(todo);
                  }}
                >
                  {todo.body}
                </li>
              </Animate>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoApp;

/*

        */
