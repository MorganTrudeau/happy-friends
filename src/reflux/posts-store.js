import React from 'react';
import Reflux from 'reflux';
import Actions from './actions';
import axios from 'axios';

var addPost = Actions.addPost;
var route = Actions.route;

class PostsStore extends Reflux.Store {

  constructor() {
    super();
    this.state = {posts: []};
    this.getState();
    this.listenTo(addPost, this.onAddPost);
  }

  getState(data) {
    axios.get('http://localhost:8888/api/posts')
      .then(response => {
        this.setState({posts:response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onAddPost(text, username) {
    var config = {
      headers: {
        'Accept-Language': 'en-US',
        'Cookie': 'username=Morgan'
      }
    };

    axios.post('http://localhost:8888/api/posts', 
      {withCredentials:true},
      {"text": text, "username": username}, config)
        .then(response => {
          console.log(response);
          this.getState();
        }
    );
  }
}

export default PostsStore; 