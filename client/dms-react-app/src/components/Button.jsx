import React, { Component } from 'react';
import '../css/App.css';
import Button from 'react-bootstrap/Button';

// You should import individual components like: react-bootstrap/Button Navbar, Jumbotron etc
// rather than the entire library. Doing so pulls in only the specific 
// components that you use, which can significantly reduce the amount 
// of code you end up sending to the client.

class Button extends Component {
    constructor(props) {
      super(props);
  }
  
     render() {
      return (
        <div className="Button">
        
        </div>
      );
    }
  }
export default Button;
