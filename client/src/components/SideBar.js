import React, { Component } from 'react';
import '../pages/Home.css';
import './SideBar.css';
import SideBarRow from './SideBarRow.js';

class SideBar extends Component {
  render() {
    const self = this;

    return (
      <div className="SideBar">
        {
          this.props.sideBarItems.map((item, index) => 
            <SideBarRow browsePages={self.props.browsePages} key={index} {...item}/>
          )
        }
      </div>
    );
  }
}

export default SideBar;