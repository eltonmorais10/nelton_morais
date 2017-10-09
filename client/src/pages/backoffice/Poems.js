import React, { Component } from 'react';
import '../Home.css';

import PoemItem from '../../components/PoemItem.js';

class Poems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading_page: false,
      syncing_new_poems: -1, //-1: not loading; 0:loading; 1: loaded
      newPoems: [],
    };

    this.fetchNewPoems = this.fetchNewPoems.bind(this);
    this.savePoemToDB = this.savePoemToDB.bind(this);
    this.hidePoem = this.hidePoem.bind(this);
  }

  fetchNewPoems() {
    const clientToken = prompt("Enter client token");

    if (clientToken) {
      this.setState({ syncing_new_poems: 0 }, function() {
        fetch('/poems/sync?clientToken='+clientToken)
          .then(res => res.json())
          .then(poems => this.setState({ newPoems: poems, syncing_new_poems: 1 }));
      });
    }
  }

  savePoemToDB(index) {
    const self = this;

    fetch('/poems/saveToDB',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        poem: this.state.newPoems[index],
      })
    })
    .then(res => res.json())
    .then((response) => {
      console.log("ACABOU");
      console.log("response",response);
      if (response) {
        self.hidePoem(self.state.newPoems[index].id)
      } 
    });
  }

  hidePoem(id) {
    const newPoems = [];

    this.state.newPoems.forEach(function(poem) {
      if (poem.id !== id) {
        newPoems.push(poem);
      }
    });

    this.setState({newPoems: newPoems});
  }

  render() {
    return (
      <div className="Poems backoffice-page">
        <div className="backoffice-page-title">Poems</div>
        <div className="backoffice-submenu">
          <div className="backoffice-submenu-option refresh" onClick={this.fetchNewPoems.bind(this)}>
            <i className={"fa fa-refresh" + (this.state.syncing_new_poems == 0 ? " fa-spin":"")} aria-hidden="true"></i> Sync with FB
          </div>
        </div>
        <div className="backoffice-page-content">
          <div className={"new-poems" + (this.state.syncing_new_poems == -1 ? " hide":"")}>
            {(() => {
              if (this.state.syncing_new_poems == 0) {
                return (
                  <span>Checking for new published poems...</span>
                );
              } else if (this.state.syncing_new_poems == 1) {
                return this.state.newPoems.map((poem, index) =>
                  <PoemItem key={index} index={index} {...poem} savePoemToDB={this.savePoemToDB} hidePoem={this.hidePoem}/>
                );
              }
            })()}
          </div>
          </div>
      </div>
    );
  }
}

export default Poems;