import React, { Component } from 'react';
import './App.css';

import PoemItem from './PoemItem.js';

class PoemListing extends Component {
  state = {
    loading: true,
    poems: [],
  }

  componentDidMount() {
    fetch('/poems')
      .then(res => res.json())
      .then(poems => this.setState({ poems: poems, loading: true }));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="PoemListing">
          <i className="fa fa-circle-o-notch fa-3x fa-spin" aria-hidden="true"></i>
        </div>
      );
    }
    return (
      <div className="PoemListing">
        {this.state.poems.map((poem, index) =>
          <PoemItem key={index} {...poem} />
        )}
      </div>
    );
  }
}

export default PoemListing;