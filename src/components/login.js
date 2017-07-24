import React, { Component } from 'react';
import Reflux from 'reflux';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
import Actions from '../reflux/actions';
import axios from 'axios';
import UserStore from '../reflux/user-store';

class Login extends Reflux.Component {

  constructor(props) {
    super(props);
    this.state = {username:'', password:''};
    this.store = UserStore;
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Friends</h2>
        </div>
        <div className="loginLabel">
          <label>
            Username:
            <input 
              type="text" 
              name="username" 
              value={this.state.username} 
              onChange={this.handleChange.bind(this)} />
          </label>
        </div>
        <div className="loginLabel">
          <label>
            Password:
            <input 
              type="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleChange.bind(this)} />
          </label>
          </div>
          <Link to={'/posts'}>
            <button type="button" onClick={() => {Actions.login(this.state.username, this.state.password)}}>Login</button>
          </Link>
      </div>
        
    );  
  }
}

export default Login;

