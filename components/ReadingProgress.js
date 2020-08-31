/* eslint-disable */

import React, { Component } from 'react';
import ScrollProgress from 'scrollprogress';

export default class ReadingProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    this.progressObserver = new ScrollProgress((x, y) => {
      this.setState({ progress: y * 100 });
    });
  }

  componentWillUnmount() {
    this.progressObserver.destroy();
  }

  render() {
    const style = {
      backgroundColor: '#9F7AEA',
      height: '5px',
      position: 'fixed',
      zIndex: 10,
      top: 0,
      bottom: 0,
      left: 0,
      width: `${this.state.progress}%`
    };

    return <div className="progress-bar" style={style} />;
  }
}
