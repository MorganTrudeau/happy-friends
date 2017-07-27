import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../logo.svg';
import '../App.css';
import Reflux from 'reflux'; 
import PostsStore from '../reflux/posts-store';

class Posts extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = PostsStore;
  }

  render() {
    var posts = PostsStore.state.posts;

    function DisplayPosts(props) {
      var count = 2;
      const listPosts = posts.map((post, index) => {
        var postDate = new Date(post.created_at);
        var postTime = postDate.getTime();
        var currentTime = Date.now();
        var timeDiff = (currentTime - postTime)/60000;
        function displayTime() {
          var mins = timeDiff;
          var hours = timeDiff/60;
          var days = timeDiff/1440;
          if( mins<60 ){
            if( mins == 1 ){
              return <span className="postTime">{ mins.toFixed(0) } min ago</span>;
            }
            return <span className="postTime">{ mins.toFixed(0) } mins ago</span>;
          }
          else if( hours<24 ){
            if( hours.toFixed(0) == 1 ){
              return <span className="postTime">{ hours.toFixed(0) } hour ago</span>;
            }
            else{
              return <span className="postTime">{ hours.toFixed(0) } hours ago</span>;
            }
          }
          else {
            if( days == 1 ){
               return <span className="postTime">{ days.toFixed(0) } day ago</span>;
            }
            return <span className="postTime">{ days.toFixed(0) } days ago</span>;
          }
        }
        if(index%2 === 0){
          return (
            <div className="postEven" key={index}>
               <div className="postUsername">{ post.username }</div><div>{ displayTime() }</div><div className="postText">{ post.text }</div>
            </div>
          );  
        }
        else{
          return (
            <div className="postOdd" key={index}>
              <div className="postUsername">{ post.username }</div><div>{ displayTime() }</div><div className="postText">{ post.text }</div>
            </div>
          );
        }
        count = count++;  
      });
      return (
          <div>{listPosts}</div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Friends</h2>
        </div>
        <Link to={'/addpost'}>
          <button type="button">Add Post</button>
        </Link>
        <div className= "postsDiv">
          <DisplayPosts />
        </div>
        <div>
          <p>{ this.state.test }</p>
        </div>
      </div>
    );
  }
}       

export default Posts;








/*class Posts extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = PostsStore;
    console.log(localStorage.getItem("k"));
  }

  render() {

    var posts = this.state.posts;

    function DisplayPosts(props) {
      var count = 2;
      const listPosts = posts.map((post, index) => {
        if(index%2 == 0){
          return (
            <div className="postEven">
            <label>
              ({ post.created_at }) {post.username }: { post.text }
            </label>
            </div>
          );
        }
        else{
          return (
            <div className="postOdd">
            <label>
              ({ post.created_at }) { post.username }: { post.text }
            </label>
            </div>
          );
        }
        count = count++;
      });
      return (
          <div>{listPosts}</div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Friends</h2>
        </div>
        <Link to={'/addpost'}>
          <button type="button">Add Post</button>
        </Link>
        <div className= "postsDiv">
          <DisplayPosts />
        </div>
        <div>
          <p>{ this.state.test }</p>
        </div>
        <button type="button" onClick={ this.addPost }>Test</button>
      </div>
    );
  }
}

export default Posts;*/