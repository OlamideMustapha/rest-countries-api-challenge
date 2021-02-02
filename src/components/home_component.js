import React, { Component } from 'react';
import "./sass/styles.sass"


class Home extends Component {
  constructor (props) {
    super (props);


    this.state = {
      input: ""
    };

    this.handleInputChange = this.handleInputChange.bind (this);
    this.search = this.search.bind (this);
  }

  handleInputChange (event) {
    this.setState ({ input: event.target.value });
  }

  search () {
    // search for country entered

    this.setState ({ input: "" });
  }

  render () {
    return (
      <div className="home">

        <div className="search-filter">
          <div clasName="search__input-wrapper">
            <button className="search__btn btn" onClick={this.search}><img /></button>
            <input value={this.state.input} onChange={this.handleInputChange} />
          </div>
        </div>


        {/* render list of countries */}
      </div>
    )
  }

}


export default Home;