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

// kai turėsiu json iš BE tai pas mane bus tik const user = json ir iš vidaus matysis
// kokias roles jis turi ir ką gali daryti. kol kas tai yra statiška, nežinau kaip padryti kad JIS ŽINOTŲ kas aš. 
// Create (POST) - Make something
// Read (GET)_- Get something
// Update (PUT) - Change something
// Delete (DELETE)- Remove something

//cookiai. 
//rolės, kur jas man paimti?

const user = {
  roles: ['advancedUser', 'user', 'admin'],
  rights: ['can_view_articles']
};
// 0: {authority: "ROLE_ADMIN"}
// 1: {authority: "ROLE_USER"}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //from child
        user: [],
        token:'',
        authority:[
          // {authority: "ROLE_ADMIN"},
          // {authority: "ROLE_USER"}
        ],
    }
}

  render() {
  const curentUserRoles = localStorage.getItem('authority') || [];
  console.log(curentUserRoles)
  
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" render={ (props,state) => <LoginPage handleDatafromChild ={this.handleDatafromChild}/>}/>
          <Route exact path="/registration" component={RegistrationPage} />

          {/* {hasRole(curentUserRoles, ['ROLE_USER']) && <Route exact path="/userboard" render={ (props,state) => <UserBoard token = {this.state.token} />}/>}
          {hasRole(curentUserRoles, ['ROLE_ADMIN']) && <Route exact path="/usersubmited" render={ (props, state) => <UserBoardSubmitedDoc token = {this.state.token} />}/>}
          {hasRole(curentUserRoles, ['ROLE_SuperADMIN']) && <Route exact path="/newdoc" render={ (props, state) => <NewDocument token = {this.state.token} />}/>} */}

          {hasRole(user, ['user']) && <Route exact path="/userboard" render={ (props,state) => <UserBoard token = {this.state.token} />}/>}
          {hasRole(user, ['user']) && <Route exact path="/usersubmited" render={ (props, state) => <UserBoardSubmitedDoc token = {this.state.token} />}/>}
          {hasRole(user, ['user']) && <Route exact path="/newdoc" render={ (props, state) => <NewDocument token = {this.state.token} />}/>}
          {hasRole(user, ['advancedUser']) && <Route exact path="/usergetdoc" render={ (props, state) => <UserBoardGetedDoc token = {this.state.token} />}/>}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardusers" component={AdminBoardUsers} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardgroups" component={AdminBoardGroups} />}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboarddocs" render = { (props,state) => <AdminBoardDocs token ={ this.state.token }/>}/>}
          {hasRole(user, ['admin']) &&<Route exact path="/adminboardtemplates" component={AdminBoardTemplates} />}
        </Switch>
      </Router>
    );
  }

  handleDatafromChild = (user, token, authority) => {
    
    this.setState({
      user: user,
      token: token,
      authority: authority
    })
    console.log("tai turi būti iš vaiko " + this.state.user + this.state.token)
    console.log(this.state.authority)
  }
}

export default App;
