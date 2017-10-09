import React, { Component } from 'react';
import '../pages/Home.css';

class PoemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showBackofficeActions: false,
    }
  }

  showBackofficeActions() {
    if (this.props.savePoemToDB) {
      this.setState({ showBackofficeActions: true });
    }
  }

  hideBackofficeActions() {
    if (this.props.savePoemToDB) {
      this.setState({ showBackofficeActions: false });
    } 
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
      <div className="PoemItem" onMouseEnter={this.showBackofficeActions.bind(this)} onMouseLeave={this.hideBackofficeActions.bind(this)}>
        {(() => {
          if (this.state.showBackofficeActions) {
            return (
              <div className="backoffice-poem-actions">
                <div className="save-poem" onClick={this.props.savePoemToDB.bind(this, this.props.index)}>
                  <i className="fa fa-floppy-o" aria-hidden="true"></i> Save Poem
                </div>
                <div className="hide-poem" onClick={this.props.hidePoem.bind(this, this.props.id)}>
                  <i className="fa fa-minus" aria-hidden="true"></i> Hide Poem
                </div>
              </div>
            ); 
          }
        })()}
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