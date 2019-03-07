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
import UserBoardSubmitedDoc from './containers/UserBoardSubmitedDoc';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { hasRole } from './containers/Auth';
import Login from "./components/Login/Login";
// kai turėsiu json iš BE tai pas mane bus tik const user = json ir iš vidaus matysis
// kokias roles jis turi ir ką gali daryti. kol kas tai yra statiška, nežinau kaip padryti kad JIS ŽINOTŲ kas aš. 


const user = {
  roles: ['advancedUser', 'user', 'admin'],
  rights: ['can_view_articles']
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
    }
}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} handler={ (props,state) => <Login fetchUserData = {this.fetchUserData} />}/>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          {/* roles reiktų perduoti taip? 
          {hasRole(this.user, ['user']) && <Route exact path="/userboard" component={UserBoard} />} */}
          {hasRole(user, ['user']) && <Route exact path="/userboard" component={UserBoard} handler={ (props,state) => <UserBoard id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {hasRole(user, ['user']) && <Route exact path="/usersubmited" component={UserBoardSubmitedDoc} handler={ (props,state) => <UserBoardSubmitedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {hasRole(user, ['user']) && <Route exact path="/newdoc" component={NewDocument} />}
          {hasRole(user, ['advancedUser']) && <Route exact path="/usergetdoc" component={UserBoardGetedDoc} handler={ (props,state) => <UserBoardGetedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
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
        "token": this.getToken(),
        "content-type": "Application/json",
      
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
      })
    });
    const json = await res.json();
    this.setState({
      user: json
    })
    return json.response.status;
  }

  getToken = () =>{

  }
}

export default App;
