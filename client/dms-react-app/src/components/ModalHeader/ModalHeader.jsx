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
                <Button variant="primary" type="submit" onClick={() =>this.sendDoc()}>
                    Pateikti
                </Button>
                <Button variant="success" type="submit" onClick={() =>this.saveDoc()}>
                    Saugoti
                </Button>
            </span>    
            </div>
        );
    }
    sendDoc =(e) => {
        //kvieti dar vieną f-ją kuri pachina pateikto dok būseną?
        e.preventDefault();
        const text = this.document.text;
        const API = 'localhost:8080/document/add';
        fetch(API, {
            method: 'POST',
            body: JSON.stringify({document: text}),
        }).then(response => {
            if(response.status === 201){
                this.nextPath(`/adminboarddocs`);
            }else{
                alert("Pateikti nepavyko");
            }
        }).catch(error => console.error(error));
    };

    sendDoc =(e) => {
        e.preventDefault();
//existing value turi ateiti iš text editoriaus. Kur ten padėti this.state.?
          const data = this.props.existingValue;
          const API = 'localhost:8080/document/add';
          fetch(API, {
            method: 'POST',
            body: JSON.stringify({document: data}),
          }).then(response => {
            if(response.status === 201){
              this.nextPath(`/userboard`);
            }else{
              alert("Išsaugoti nepavyko");
            }
          }).catch(error => console.error(error));
    };

    deleteDoc = (e) => {
        //kvieti dar vieną f-ją kuri pachina pateikto dok būseną?
        e.preventDefault();
        const text = this.document.text;
        const API = 'localhost:8086/document/add';
        fetch(API, {
            method: 'POST',
            body: JSON.stringify({document: text}),
        }).then(response => {
            if(response.status === 201){
                //do not show document in the list;
            }else{
                alert("Pašalinti nepavyko");
            }
        }).catch(error => console.error(error));
    };
}

export default withRouter(ModalHeader);