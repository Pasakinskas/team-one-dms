import React, { Component } from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
        response: "",
        token:'',
        email:'',
        password:'',
        text:'',
    }
}


render() {
  let test = this.props.text;
    return (
      <div className="Login">
        <Header/>
        <Login fetchUserData ={this.fetchUserData} text={test} response={this.state.response}/>/>
        <Footer/>
      </div>
    );
  }
}

export default LoginPage;