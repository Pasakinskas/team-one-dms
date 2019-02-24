import React, { Component } from 'react';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegistrationPage from './containers/RegistrationPage';
import UserBoard from './containers/UserBoard';
import UserBoardGetedDoc from './containers/UserBoardGetedDoc';
import NewDocument from './containers/NewDocument';
import AdminBoardUsers from './containers/AdminBoardUsers';
import AdminBoardGroups from './containers/AdminBoardGroups';
import AdminBoardDocs from './containers/AdminBoardDocs';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
//import { hasRole, isAllowed } from './containers/Auth';


// const user = {
//   roles: ['user'],
//   rights: ['can_view_articles']
// };

// const admin = {
//   roles: ['user', 'admin'],
//   rights: ['can_view_articles', 'can_view_users']
// };

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* {hasRole(user, ['user']) && <p>Is User</p>}
          {hasRole(user, ['admin']) && <p>Is Admin</p>}
          {isAllowed(user, ['can_view_articles']) && <p>Can view Articles</p>}
          {isAllowed(user, ['can_view_users']) && <p>Can view Users</p>} */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/userboard" component={UserBoard} />
          <Route exact path="/usergetdoc" component={UserBoardGetedDoc} />
          <Route exact path="/newdoc" component={NewDocument} />
          <Route exact path="/adminboardusers" component={AdminBoardUsers} />
          <Route exact path="/adminboardgroups" component={AdminBoardGroups} />
          <Route exact path="/adminboarddocs" component={AdminBoardDocs} />
        </Switch>
      </Router>
    );
  }
}

export default App;
