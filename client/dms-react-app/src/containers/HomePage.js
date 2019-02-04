import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Logo from './components/Logo';
import Footer from './components/Footer';

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
