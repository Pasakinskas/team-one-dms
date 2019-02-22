import React, { Component } from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class LoginPage extends Component {
  render() {
    return (
      <div className="Login">
        <Header/>
        <Login/>
        <Footer/>
      </div>
    );
  }
}

export default LoginPage;