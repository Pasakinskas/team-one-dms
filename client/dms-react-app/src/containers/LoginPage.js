import React, { Component } from 'react';
import Login from '../components/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: [],
        token:'',
        authority: '',
    }
}


render() {
    return (
      <div className="Login">
        <Header/>
        <Login handleDatafromChild ={this.handleDatafromChild}/>
        <Footer/>
      </div>
    );
  }

  nextPath = (path)=>{
    this.props.history.push(path);
  }

  handleDatafromChild = async (authority) =>{
    console.log('vaikelis dave'+ authority);
    this.setState({
      authority:authority,
    })
    if (authority.includes("ROLE_ADMIN")) {
      this.nextPath(`/adminboarddocs`);
    } else {
     this.nextPath(`/userboard`);
    }
    this.props.handleDatafromChild(this.state.authority);
  }
}

export default withRouter(LoginPage);