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
import { withRouter } from 'react-router-dom';

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
    let curentUserRoles = [];
    if (localStorage.getItem('authority'))  {
      curentUserRoles = localStorage.getItem('authority').split(",");
    }


    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" render={ (props,state) => <LoginPage handleDatafromChild = {this.handleDatafromChild} />}/>
          <Route exact path="/registration" component={RegistrationPage} />
          {curentUserRoles.includes("ROLE_USER") && <Route exact path="/userboard" render={ (props,state) => <UserBoard token = {this.state.token} />}/>}
          {curentUserRoles.includes("ROLE_USER") && <Route exact path="/usersubmited" component={UserBoardSubmitedDoc} handler={ (props, state) => <UserBoardSubmitedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {curentUserRoles.includes("ROLE_USER") && <Route exact path="/newdoc" component={NewDocument} />}
          {curentUserRoles.includes("ROLE_ADMIN") && <Route exact path="/usergetdoc" component={UserBoardGetedDoc} handler={ (props, state) => <UserBoardGetedDoc id = {this.state.user.id} token = {this.state.user.token} />}/>}
          {curentUserRoles.includes("ROLE_ADMIN") &&<Route exact path="/adminboardusers" component={AdminBoardUsers} />}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/adminboardgroups" component={AdminBoardGroups} />}
          {this.getUserRoles().includes("ROLE_ADMIN") &&<Route exact path="/adminboarddocs" render = { (props,state) => <AdminBoardDocs token ={ this.state.token }/>}/>}
          {/* {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/adminboardtemplates" component={AdminBoardTemplates} />} */}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/newtemplate" component={newTemplate} />}
          {curentUserRoles.includes("ROLE_ADMIN")  &&<Route exact path="/usergroupdocs" component={UserBoardGroupDocs} />}

        </Switch>
      </Router>
    );
  }

  nextPath = (path)=>{
    this.props.history.push(path);
  }

  getUserRoles = () => {
    let curentUserRoles = [];
    if (localStorage.getItem('authority'))  {
      curentUserRoles = localStorage.getItem('authority').split(",");
    }
    console.log("appjs is taking roles from localstorage")
    console.log(curentUserRoles)
    return curentUserRoles;
  }

  handleDatafromChild = (authority) => {
      this.setState({
      authority: authority
    })
    console.log("tai turi būti iš vaiko " + authority)
    if (this.state.authority.includes("ROLE_ADMIN")) {
      console.log("Nukreipia į adminbordą")

      //this.nextPath(`/adminboarddocs`);
    } else {
      console.log("aš useris")
     // this.nextPath(`/userboard`);
    }
    //console.log(this.state.authority)
  }
}

export default App;
