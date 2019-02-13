import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/Header.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSnowflake} from '@fortawesome/free-solid-svg-icons';
library.add(faSnowflake)

class Header extends Component {

  nextPath = (path)=>{
    this.props.history.push(path);
  }

   render() {
      return (
        <div className="head">
          <div>
            <FontAwesomeIcon className="one" icon="snowflake" onClick={() =>this.nextPath(`/`)}/>
          </div>
          <div>
            <Button variant="success" onClick={() =>this.nextPath(`/registration`)}>Registruotis</Button>
            <Button variant="primary" onClick={() =>this.nextPath(`/login`)}>Prisijungti</Button>
          </div>
        </div>
      );
    }
  }
export default  withRouter(Header);

