import React, {Component} from 'react';
import {Animate} from './Animate/Animate';
import './styles/Todo.css';

const Icon = ({name, color = 'black'}) => (
  <i className={`small material-icons ${color}-text`}>{name}</i>
);

class Todo extends Component {
  render() {
    const {children, item, onDelete, onToggle, ...rest} = this.props;
    return (
      <div {...rest}>
        {item.body}
        <button onClick={onDelete} style={{float: 'right'}}>
          <Icon name="clear" color="red" />
        </button>
        <button onClick={onToggle} style={{float: 'right'}}>
          <Icon name="check" color="green" />
        </button>
      </div>
    );
  }
}

class TodoApp extends Component {
  state = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    formHide: false,
    fadeOut: null
  };

  componentDidMount() {}

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

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

  deleteItem = todo => {
    this.setState({fadeOut: todo.id}, () => {
      setTimeout(() => {
        //console.log('done', todo);
        this.setState({
          todos: [...this.state.todos.filter(e => e.id !== todo.id)]
        });
      }, 400);
    });
  };

  /* , () =>
      setTimeout(
        this.setState({
          todos: [...this.state.todos.filter(e => e.id !== todo.id)]
        }),
        5000
      ) */

  render() {
    return (
      <div className="TodoApp">
        <Animate hide={this.state.formHide}>
          <form
            className="todo-form"
            onSubmit={event => {
              event.preventDefault();
              const value = event.target.elements.newTodo.value.trim();

              if (value === '') return;
              this.setState(
                {
                  todos: [
                    {
                      body: event.target.elements.newTodo.value,
                      id: Date.now(),
                      done: false
                    },
                    ...this.state.todos
                  ],
                  formHide: true
                },
                () => {
                  setTimeout(() => this.setState({formHide: false}), 100);
                }
              );
              event.target.elements.newTodo.value = '';
            }}
          >
            <label>Todo:</label>
            <input type="text" id="newTodo" />
            <button type="submit">
              <Icon name="add" />
            </button>
          </form>
        </Animate>

        <div className="Lists">
          <h4>To Do Items</h4>
          <div className="item-list swing">
            {this.state.todos.map((todo, i) => {
              return (
                <Animate
                  key={todo.id}
                  hide={todo.done || todo.id === this.state.fadeOut}
                >
                  <Todo
                    className="items"
                    onDelete={event => {
                      this.deleteItem(todo);
                    }}
                    onToggle={event => {
                      this.removeItem(todo);
                    }}
                    item={todo}
                  />
                </Animate>
              );
            })}
          </div>

          <h4>Done Items</h4>
          <div className="item-list swing">
            {this.state.todos.map((todo, i) => {
              //if (todo.done === true) return null;
              return (
                <Animate
                  key={todo.id}
                  hide={!todo.done || todo.id === this.state.fadeOut}
                >
                  <Todo
                    className="items"
                    onDelete={event => {
                      this.deleteItem(todo);
                    }}
                    onToggle={event => {
                      this.removeItem(todo);
                    }}
                    item={todo}
                  />
                </Animate>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;

/*

        */
