import React, {Component} from 'react';
import './styles/Todo.css';

const inStyle = {
  transition: 'all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76)',
  lineHeight: '1.5rem',
  opacity: '1',
  transform: 'none'
};

const outStyle = {
  transform: 'rotateY(-90deg)',
  transition: 'all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76)',
  opacity: '0'
};

class AnimateStyle extends Component {
  state = {
    index: 0,
    show: true,
    style: {}
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          index: 1,
          style: !this.props.hide ? this.props.in : this.props.out
        }),
      10
    );
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.hide && this.props.hide)
      setTimeout(() => this.setState({style: this.props.out}), 10);
    if (prevProps.hide && !this.props.hide)
      setTimeout(
        () =>
          this.setState({show: true, index: 0}, () =>
            setTimeout(() => this.setState({style: this.props.in}), 10)
          ),
        10
      );
  }

  onTransitionEnd = () => {
    if (this.props.hide) this.setState({show: false});
    if (!this.props.hide) this.setState({show: true});
  };

  render() {
    if (this.state.show === false) return null;
    const {children} = this.props;
    const {props} = children;
    return {
      ...children,
      props: {
        ...props,
        onTransitionEnd: this.onTransitionEnd,
        style: this.state.style
      }
    };
  }
}

class Animate extends Component {
  state = {
    index: 0,
    stage: ['', 'show'],
    show: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({index: 1, show: !this.props.hide}), 10);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.hide && this.props.hide)
      setTimeout(() => this.setState({index: 0}), 10);
    if (prevProps.hide && !this.props.hide)
      setTimeout(
        () =>
          this.setState({show: true, index: 0}, () =>
            setTimeout(() => this.setState({index: 1}), 10)
          ),
        10
      );
  }

  onTransitionEnd = () => {
    if (this.props.hide) this.setState({show: false});
    if (!this.props.hide) this.setState({show: true});
  };

  render() {
    if (this.state.show === false) return null;
    const {children} = this.props;
    const {props} = children;
    return {
      ...children,
      props: {
        ...props,
        onTransitionEnd: this.onTransitionEnd,
        className: this.state.stage[this.state.index]
      }
    };
  }
}

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
      <div className="TodoApp">
        <AnimateStyle hide={false} in={inStyle} out={outStyle}>
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
        </AnimateStyle>

        <h4>To Do Items</h4>
        <ul className="swing">
          {this.state.todos.map((todo, i) => {
            return (
              <AnimateStyle
                key={todo.id}
                hide={todo.done}
                in={inStyle}
                out={outStyle}
              >
                <li
                  className="test"
                  onClick={event => {
                    this.removeItem(todo);
                  }}
                >
                  {todo.body}
                </li>
              </AnimateStyle>
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
                  className="test"
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
