import React, { Component } from 'react';
import Registration from '../components/Registration/Registration';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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