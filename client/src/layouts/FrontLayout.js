import React, { Component } from 'react';

class FrontLayout extends Component {
  render() {
    return (
      <div className="body-content">
        <div className="top-bar">
          <div className="top-bar-menu">
            <div className="top-bar-menu-head">
              <i className="fa fa-bars fa-3x" aria-hidden="true"></i>
            </div>
            <div className="top-bar-menu-content">
            </div>
          </div>
          <div className="top-bar-logo">
            <div className="logo">Nelton Morais</div>
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