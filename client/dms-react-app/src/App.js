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
import newTemplate from './containers/NewTemplate';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { hasRole } from './containers/Auth';
import UserBoardGroupDocs from './containers/UserBoardGroupDocs';

// kai turėsiu json iš BE tai pas mane bus tik const user = json ir iš vidaus matysis
// kokias roles jis turi ir ką gali daryti. kol kas tai yra statiška, nežinau kaip padryti kad JIS ŽINOTŲ kas aš. 
// Create (POST) - Make something
// Read (GET)_- Get something
// Update (PUT) - Change something
// Delete (DELETE)- Remove something

//cookiai. 
//rolės, kur jas man paimti?

// const user = {
//   roles: ['advancedUser', 'user', 'admin'],
//   rights: ['can_view_articles']
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //from child
        user: [],
        token:'',
        authority:[],
    }
}
  render() {
    const curentUserRoles = localStorage.getItem('authority').split(",");

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          {curentUserRoles.includes("ROLE_USER") && <Route exact path="/userboard" render={ (props,state) => <UserBoard token = {this.state.token} />}/>}
          {curentUserRoles.includes("ROLE_USER") && <Route exact path="/usersubmited" component={UserBoardSubmitedDoc} handler={ (props, state) => <UserBoardSubmitedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {curentUserRoles.includes("ROLE_USER") && <Route exact path="/newdoc" component={NewDocument} />}
          {curentUserRoles.includes("ROLE_ADMIN") && <Route exact path="/usergetdoc" component={UserBoardGetedDoc} handler={ (props, state) => <UserBoardGetedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {curentUserRoles.includes("ROLE_ADMIN") &&<Route exact path="/adminboardusers" component={AdminBoardUsers} />}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/adminboardgroups" component={AdminBoardGroups} />}
          {curentUserRoles.includes("ROLE_ADMIN") &&<Route exact path="/adminboarddocs" render = { (props,state) => <AdminBoardDocs token ={ this.state.token }/>}/>}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/adminboardtemplates" component={AdminBoardTemplates} />}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/newtemplate" component={newTemplate} />}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/usergroupdocs" component={UserBoardGroupDocs} />}
          
        </Switch>
      </Router>
    );
  }

  handleDatafromChild = (user, token, authority) => {

    this.setState({
      user: user,
      token: token,
      //authority: authority
    })
    console.log("tai turi būti iš vaiko " + this.state.user + this.state.token)
    //console.log(this.state.authority)
  }
}

export default App;
