import React, { Component } from 'react';
import '../Home.css';

class Poems extends Component {
  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users, loading: false }));
  }

  render() {
    return (
      <div className="Poems">
        <h2>Poems</h2>
      </div>
    );
  }
}

export default Poems;