import React, { Component } from 'react';

class EmptyLayout extends Component {
  render() {
    return (
      <div className="body-content">
        <div id="root">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default EmptyLayout;