import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import SideBar from '../components/SideBar.js';
import Index from './backoffice/Index.js';
import About from './backoffice/About.js';
import Poems from './backoffice/Poems.js';

class Backoffice extends Component {
  constructor(props) {
    super(props);

    this.sideBarItems = [
      {
        label: "Backoffice",
        icon: <i className="fa fa-bars" aria-hidden="true" />,
        content: <Index />
      },
      {
        label: "Poems",
        icon: <i className="fa fa-paint-brush" aria-hidden="true" />,
        content: <Poems />
      },
      {
        label: "About",
        icon: <i className="fa fa-id-card-o" aria-hidden="true" />,
        content: <About />
      },
    ];

    this.browsePages = this.browsePages.bind(this);
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users, loading: false }));
  }

  browsePages(item) {
    ReactDOM.render(item, document.getElementById("backoffice-content"));
  }

  render() {
    return (
      <div className="backoffice">
        <div className="backoffice-side-bar">
          <SideBar browsePages={this.browsePages.bind(this)} sideBarItems={this.sideBarItems} />
        </div>
        <div className="backoffice-content" id="backoffice-content">
        </div>
      </div>
    );
  }
}

export default Backoffice;