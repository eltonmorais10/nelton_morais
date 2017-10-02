import React, { Component } from 'react';
import '../pages/Home.css';
import './SideBar.css';

class SideBarRow extends Component {
  render() {
    return (
      	<div className="SideBarRow" onClick={() => { this.props.browsePages(this.props.content)}} >
      		<div className="text">
        		{this.props.label}
      		</div>
      		<div className="icon">
        		{this.props.icon}
      		</div>
    	</div>
    );
  }
}

export default SideBarRow;
