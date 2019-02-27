import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import '../ModalHeader/ModalHeader.css'

class ModalHeader extends Component {
    render() {
        return (
            <div>
                <h4>Dokumento peržiūra</h4>
            <span className="modalBtn">
                <Button variant="danger" type="submit" onClick={this.props.modalIsOpen}>
                     X
                </Button>
                <Button variant="primary" type="submit" onClick={() =>this.handleClickSend()}>
                    Pateikti
                </Button>
                <Button variant="success" type="submit" onClick={() =>this.handleClickSave()}>
                    Saugoti
                </Button>
            </span>    
            </div>
        );
    }


}

export default withRouter(ModalHeader);