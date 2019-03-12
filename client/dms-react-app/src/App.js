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
        response: "",
        token: {},
        text:'kažkas'

    }
}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/login" component={LoginPage} hanfler={ (props,state) => <Login fetchUserData ={this.fetchUserData} text={this.state.text} />}/> */}
          <Login fetchUserData ={this.fetchUserData} text={this.state.text} response={this.state.response}/>
          <Route exact path="/registration" component={RegistrationPage} />
          {/* roles reiktų perduoti taip? 
          {hasRole(this.user, ['user']) && <Route exact path="/userboard" component={UserBoard} />} */}
          {hasRole(user, ['user']) && <Route exact path="/userboard" component={UserBoard} handler={ (props,state) => <UserBoard id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {hasRole(user, ['user']) && <Route exact path="/usersubmited" component={UserBoardSubmitedDoc} handler={ (props, state) => <UserBoardSubmitedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {hasRole(user, ['user']) && <Route exact path="/newdoc" component={NewDocument} />}
          {hasRole(user, ['advancedUser']) && <Route exact path="/usergetdoc" component={UserBoardGetedDoc} handler={ (props, state) => <UserBoardGetedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardusers" component={AdminBoardUsers} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardgroups" component={AdminBoardGroups} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboarddocs" component={AdminBoardDocs} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardtemplates" component={AdminBoardTemplates} />}
        </Switch>
      </Router>
    );
  }

//userio duomenų gavimui ir setinimui
  fetchUserData = async () => {
    //pasidarau iš anksto data
    const data = JSON.stringify({
      "email": "ana@ses.lt",
      "password": "Kalafioras1"
    });
    //spausdinu
    console.log("my data is: " + data)
    const res = await fetch("http://localhost:8086/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: data
    });
    const json = await res.json();
    console.log(res.status)
    this.setState({
      user: json, 
      response:res.status
    })
    console.log(json)
    return json;
  }

  getToken = () =>{

  }
}

export default App;
