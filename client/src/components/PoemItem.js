import React, { Component } from 'react';
import '../pages/Home.css';

class PoemItem extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    // console.log("props", this.props);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="PoemListing">
          <h3>Loading...</h3>
        </div>
      );
    }
    return (
      <div className="PoemItem">
        <div className="cover">
          <img alt={this.props.title} src={this.props.image} />
        </div>
        <div className="title">{this.props.title}</div>
        <div className="content"> 
          <div className="text" dangerouslySetInnerHTML={{__html: this.props.text}} />
          <p className="read-more">
            <a href="#" className="button">
              <i className="fa fa-eye" aria-hidden="true"></i> Ver mais
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default PoemItem;