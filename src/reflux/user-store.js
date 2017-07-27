import Reflux from 'reflux';
import Actions from './actions';
import axios from 'axios';

var login = Actions.login;

class UserStore extends Reflux.Store {

  constructor(props) {
    super(props);
    this.state = {user: ''};
    this.listenTo(login, this.onLogin);
  }

   onLogin(username, password) {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post('https://safe-ocean-15252.herokuapp.com/auth/login', 
      {"username": username, "password": password}, config)
    .then(response => {
        console.log(response);
        if(response.data.state === 'success') {
          console.log("hi");
          document.cookie = "username=" + username;
        }
    });
  }
}

export default UserStore; 