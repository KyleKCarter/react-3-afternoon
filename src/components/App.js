import React, { Component } from 'react';
import axios from "axios";
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      displayPosts: [],
      errorMessage: ""
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts/").then( response => {
      console.log(response.data)
      this.setState({ posts: response.data, displayPosts: response.data});
    })
    .catch((error) => {
      console.log(error.message);
      this.setState({ errorMessage: error.message})
    })
  }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/?id=${ id }`, { text }).then( response => {
      this.setState({ posts: response.data })
    })
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/?id=${ id }`).then( response => {
      this.setState({ posts: response.data })
    })
  }

  createPost( text ) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, { text }).then( response => {
      this.setState({ posts: response.data })
    })
  }

  updateDisplayPosts = arr => {
    this.setState({displayPosts: arr});
  }

  render() {
    const { displayPosts, posts } = this.state;

    return (
      <div className="App__parent">
        <Header 
                updateDisplayPosts={this.updateDisplayPosts}
                searchPostFn={ this.searchPost }
                posts={ posts }/>

        <section className="App__content">

          <Compose 
                  createPostFn={ this.createPost }/>

          {
            displayPosts.map( post => (
              <Post 
                    key={ post.id } 
                    text={ post.text}
                    date={ post.date}
                    id={ post.id}
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost } />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;