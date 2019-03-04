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
import AdminBoardTemplates from './containers/AdminBoardTemplates';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { hasRole } from './containers/Auth';

// kai turėsiu json iš BE tai pas mane bus tik const user = json ir iš vidaus matysis
// kokias roles jis turi ir ką gali daryti. kol kas tai yra statiška, nežinau kaip padryti kad JIS ŽINOTŲ kas aš. 


const user = {
  roles: ['advancedUser', 'user', 'admin'],
  rights: ['can_view_articles']
};

class App extends Component {
  constructor(props) {
    super(props);
// čia steitinam userį, kad galima būtų jį čia setinti
    this.state = {
        user: {},
    }
}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* į login.jsx reikia paduoti fetch f-ją kažkaip taip:
          <Route exact path="/login" component={LoginPage} handler={ (props,state) => <Login fetchUserData = {this.fetchUserData} />}/>
          tik bėda, kad LoginPage yra ne componentas o page */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          {/* roles reiktų perduoti taip? 
          {hasRole(this.user, ['user']) && <Route exact path="/userboard" component={UserBoard} />} */}
          {hasRole(user, ['user']) && <Route exact path="/userboard" component={UserBoard} />}
          {hasRole(user, ['user']) && <Route exact path="/newdoc" component={NewDocument} />}
          {hasRole(user, ['advancedUser']) && <Route exact path="/usergetdoc" component={UserBoardGetedDoc} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardusers" component={AdminBoardUsers} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardgroups" component={AdminBoardGroups} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboarddocs" component={AdminBoardDocs} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardtemplates" component={AdminBoardTemplates} />}
        </Switch>
      </Router>
    );
  }
//userio duomenų gavimui ir setinimui
  fetchUserData = async (url) => {
    const res = await fetch("http://localhost:8086/login", {
      
      method: "POST",
      headers: {
        "content-type": "Application/json",
      
      },
      body: {
        "email": this.state.email,
        "password": this.state.password,
      }
    });
    const json = await res.json();
    this.setState({
      user: json
    })
    return json.response.status;
  }
}

export default App;
