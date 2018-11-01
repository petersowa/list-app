import {Component} from 'react';

class Animate extends Component {
  state = {
    index: 0,
    stage: ['', 'show'],
    show: true,
    className: null
  };

  childClass = this.props.children.props.className || '';

  componentDidMount() {
    //console.log(this.childClass);
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

  onTransitionEnd = event => {
    //console.log('transition end', this.props, event.propertyName);
    if (event.propertyName === 'opacity') {
      if (this.props.hide) this.setState({show: false});
      if (!this.props.hide) this.setState({show: true});
    }
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
        className: `${this.childClass} ${this.state.stage[this.state.index]}`
      }
    };
  }
}

export {Animate};
