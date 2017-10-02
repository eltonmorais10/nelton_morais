import React, { Component } from 'react';
import './Home.css';

import PoemListing from '../components/PoemListing.js';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <PoemListing />
      </div>
    );
  }
}

export default Home;