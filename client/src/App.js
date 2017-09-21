import React, { Component } from 'react';
import './App.css';

import PoemListing from './PoemListing.js';

class App extends Component {
  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users, loading: false }));
  }

  render() {
    return (
      <div className="App">
        <PoemListing />
      </div>
    );
  }
}

export default App;