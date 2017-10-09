import React, { Component } from 'react';

class FrontLayout extends Component {
  render() {
    return (
      <div className="body-content">
        <div className="top-bar">
          <div className="top-bar-logo">
            <div className="logo">
              <a href="/">Nelton Morais</a>
            </div>
          </div>
          <div className="top-bar-image">
            <img src="/images/profile.jpg" alt="profile" />
          </div>
        </div>
        <div id="root">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default FrontLayout;