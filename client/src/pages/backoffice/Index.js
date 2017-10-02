import React, { Component } from 'react';
import '../Home.css';

class Index extends Component {
  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users, loading: false }));
  }

  render() {
    return (
      <div className="Index">
        <h2>Index</h2>
      </div>
    );
  }
}

export default Index;