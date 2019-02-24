import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSnowflake} from '@fortawesome/free-solid-svg-icons';
import './NewDocHeader.css';
library.add(faSnowflake)

class NewDocHeader extends Component {
    nextPath = (path)=>{
        this.props.history.push(path);
      }
    render() {
        return (
          <div className="newDocHead">
            <FontAwesomeIcon className="one" icon="snowflake" onClick={() =>this.nextPath(`/`)}/>
            <Button className="SignOut" variant="outline-info" onClick={() =>this.nextPath(`/login`)}>Atsijungti</Button>
          </div> 
        );
    }
}

export default withRouter(NewDocHeader);