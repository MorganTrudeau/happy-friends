import React from 'react';
import Reflux from 'reflux';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Posts from './components/posts';
import AddPosts from './components/addpost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './index.css'


class App extends Reflux.Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/addpost" component={AddPosts}/>
          </Switch>
        </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
