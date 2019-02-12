import React, { Component } from 'react';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegistrationPage from './containers/RegistrationPage';
import UserBoard from './containers/UserBoard';
import UserBoardGetedDoc from './containers/UserBoardGetedDoc';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>          
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/userboard" component={UserBoard} />
          <Route exact path="/usergetdoc" component={UserBoardGetedDoc} />
        </Switch>
      </Router>
    );
  }
}

export default App;
