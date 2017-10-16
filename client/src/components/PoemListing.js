import React, { Component } from 'react';
import '../pages/Home.css';
import Loading from 'react-loading-animation';
import { CSSTransitionGroup } from 'react-transition-group';

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
    const poems = this.state.poems.map((poem, index) =>
      <PoemItem key={index} {...poem} />
    );

    return (
      <div className="PoemListing">
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          {poems}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default PoemListing;