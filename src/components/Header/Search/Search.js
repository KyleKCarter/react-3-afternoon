import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';
import axios from 'axios';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // text: ""
    }
  }

  searchPost = (val) => {
    // this.setState({ text: val })
    // console.log(this.state.text)
    let filteredPosts = this.props.posts.filter(element => {
      if(element.text.includes(val)) {
        return true;
      } else {
        return false;
      }
    })
    this.props.updateDisplayPosts(filteredPosts);

    // console.log(filteredPosts);
  }

  render() {

    console.log(this.props.posts)

    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={e => this.searchPost(e.target.value)} />
          {/* {searchThroughPosts} */}

          <SearchIcon id="Search__icon" />
        </div>

      </section>
    )
  }
}