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
      <div className="About backoffice-page">
        <div className="backoffice-title">About</div>
      </div>
    );
  }
}

export default About;