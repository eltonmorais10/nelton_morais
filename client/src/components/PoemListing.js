import React, { Component } from 'react';
import '../pages/Home.css';
import Loading from 'react-loading-animation';

import PoemItem from './PoemItem.js';

class PoemListing extends Component {
  state = {
    loading: true,
    poems: [],
  }

  componentDidMount() {
    fetch('/poems/getAll')
      .then(res => res.json())
      .then(poems => this.setState({ poems: poems, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="PoemListing">
          <Loading />
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