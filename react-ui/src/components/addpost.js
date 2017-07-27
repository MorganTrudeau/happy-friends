import React from 'react';
import Reflux from 'reflux';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
import Actions from '../reflux/actions';
import PostsStore from '../reflux/posts-store';

var route = Actions.route;

class AddPost extends Reflux.Component {

  constructor(props) {
    super(props);
    this.state = {username: '', text: ''};
    this.store = PostsStore;
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  route(props) {
    props.history.push('/posts');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Friends</h2>
        </div>
          <div className="usernameInput">
            username:
            <input className="usernameInput" 
              type="text" 
              name="username" 
              value={this.state.username} 
              onChange={this.handleChange.bind(this)} />
          </div>
          <div className="loginLabel">
            <textarea maxLength="200" 
              rows="3" 
              cols="30" 
              placeholder="Say Something" 
              name="text" 
              value={this.state.text} 
              onChange={this.handleChange.bind(this)}/>
          </div>
          <Link to={"/posts"}>
            <button type="button" onClick={() => {Actions.addPost(this.state.text, this.state.username)}}>Add Post</button>
          </Link>
      </div>
    );
  }
}

export default AddPost;