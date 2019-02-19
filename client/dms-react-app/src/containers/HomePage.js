import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import Footer from '../components/Footer/Footer';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <Header/>
        <Logo/>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;
