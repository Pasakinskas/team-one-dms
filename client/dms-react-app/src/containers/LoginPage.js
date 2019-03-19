import React, { Component } from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: [],
        token:'',
    }
}


render() {
    return (
      <div className="Login">
        <Header/>
        <Login handleDatafromChild ={this.props.handleDatafromChild}/>
        <Footer/>
      </div>
    );
  }

  handleDatafromChild = () =>{
    this.props.handleDatafromChild(this.state.user, this.state.token);
  }
}

export default LoginPage;