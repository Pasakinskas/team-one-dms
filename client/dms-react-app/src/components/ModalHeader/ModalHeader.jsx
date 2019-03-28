import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
                <Button variant="primary" type="submit" onClick={this.props.sendDoc}>
                    Pateikti
                </Button>
                <Button variant="success" type="submit" onClick={() =>this.saveDoc()}>
                    Saugoti
                </Button>
            </span>    
            </div>
        );
    }


    saveDoc = (e) =>{
        e.preventDefault();
          const data = this.props.existingValue;
          const API = 'http://localhost:8086/document/put/new';
          fetch(API, {
            method: 'PUT',
            body: JSON.stringify({document: data}),
          }).then(response => {
            if (response.status === 201){
              this.nextPath(`/userboard`);
            } else {
              alert("Išsaugoti nepavyko");
            }
          }).catch(error => console.error(error));
      }
}

export default withRouter(ModalHeader);