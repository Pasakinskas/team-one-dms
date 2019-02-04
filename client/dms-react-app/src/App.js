import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import './css/App.css';
import Login from "./containers/LoginPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="App-header"/>
        <Footer/>
      </div>
    );
  }
}

export default App;
