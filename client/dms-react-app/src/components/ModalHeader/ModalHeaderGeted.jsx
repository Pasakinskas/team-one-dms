import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../ModalHeader/ModalHeader.css'

class ModalHeaderGeted extends Component {
    render() {
        return (
            <div>
                 <h4>Dokumento atmetimo priežastis</h4>
            <span className="modalBtn">
                <Button variant="danger" type="button" onClick={this.props.rejectModalIsOpen}>
                     X
                </Button>
                <Button variant="success" type="button" onClick={()=>{this.props.sendRejection()}}>
                    Tvirtinti šalinimą
                </Button>
            </span>    
            </div>
        );
    }
}

export default ModalHeaderGeted;