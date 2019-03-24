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
        e.preventDefault();
        const token = localStorage.getItem("token");
        const sentDocList = this.changeDocByCondition("submited");
        const API = "http://localhost:8086/status/post/change?id=27&statusId=2&description='kaka'";
         fetch(API, {
            method: 'POST',
            headers: {
                'token': token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({sentDocList}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath(`/userboard`);
            }else{
                alert("Pateikti nepavyko");
            }
        }).catch(error => console.error(error));
    };
    
    saveDoc = (e) =>{
        e.preventDefault();
          const data = this.props.existingValue;
          const API = 'http://localhost:8086/document/post/new';
          fetch(API, {
            method: 'POST',
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