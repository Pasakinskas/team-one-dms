import React, { Component } from 'react';
import Registration from '../components/Registration';
import Header from '../components/Header';
import Footer from '../components/Footer';

class RegistrationPage extends Component {
  render() {
    return (
      <div className="Registration">
        <Header/>
        <Registration/>
        <Footer/>
      </div>
    );
  }
}

export default RegistrationPage;