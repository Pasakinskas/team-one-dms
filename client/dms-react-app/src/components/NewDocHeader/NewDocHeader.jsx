import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import './NewDocHeader.css';
library.add(faAddressCard)

class NewDocHeader extends Component {
  constructor() {
    super();
    this.state = { 
      text : '',
    }
  }
    nextPath = (path)=>{
        this.props.history.push(path);
    }

    onMouseover = (e) => {
      this.setState({
        text : 'Grįžti į sąrašą',
      })
    }

    //clear the text
    onMouseout = (e) => {
      this.setState({
        text : '',
      })
    }

    render() {
      const {text} = this.state;
        return (
          <div className="newDocHead">
            <FontAwesomeIcon className="one" icon="address-card" onClick={() =>this.nextPath(`/userboard`)}  onMouseOver = {this.onMouseover} onMouseOut = {this.onMouseout}/>
            <Button className="SignOut" variant="outline-info" onClick={() =>this.nextPath(`/login`)}>Atsijungti</Button>
            <p>  {this.state.text}</p>
          </div> 
        );
    }
}

export default withRouter(NewDocHeader);