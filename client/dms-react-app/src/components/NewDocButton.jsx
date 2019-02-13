import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/NewDocButton.css';

class NewDocButton extends Component {

    nextPath = (path)=>{
        this.props.history.push(path);
      }

    render() {
        return (
            <div>
                <Button className="b" variant="dark" onClick={() =>this.nextPath(`/newdoc`)}>SUKURTI NAUJĄ DOKUMENTĄ</Button>
            </div>
        );
    }
}

export default withRouter(NewDocButton);