import React, { Component } from 'react';
import '../Home.css';

class About extends Component {
  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users, loading: false }));
  }

  render() {
    return (
      <div className="About">
        <h2>About</h2>
      </div>
    );
  }
}

export default About;