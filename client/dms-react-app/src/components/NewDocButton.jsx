import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import '../css/NewDocButton.css';

class NewDocButton extends Component {
    render() {
        return (
            <div>
                <Button className="b" variant="dark">SUKURTI NAUJĄ DOKUMENTĄ</Button>
            </div>
        );
    }
}

export default NewDocButton;