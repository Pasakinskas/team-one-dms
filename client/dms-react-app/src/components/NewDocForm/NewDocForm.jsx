import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './NewDocForm.css';
import { withRouter } from 'react-router-dom';

// get req to BE šablonų sąrašui
// Selectas su opcijomis iš BE
// pasirinkto šablono atvaizdavimas text editoriuje
// vardas
// get req to BE recipient sąrašui
// Selectas su opcijomis iš BE(nariai ir grupės)
// Buttons onClick ..?? išsaugoti documentą, ir pakeisti jo "būseną"



class NewDocForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          template: [],
          docNum:"",
          docName:"",
          name: "",      
          recipients: [],
        }
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
        const {template, docNum, docName, name, recipient } = this.state;
        const listTemplates = this.state.template.map((template) =>
        <option>{template.description}</option> );
        const listRecipients = this.state.recipients.map((recipient) =>
        <option>{recipient.name}</option> );
        return (
            <div className="form-wrapper" id="form">
             <Form onSubmit={(e)=>{this.handleClickSend(e)}}>
                <div className="template"> 
                  <FormLabel>Dokumento šablonas</FormLabel>
                  <select 
                    name="template"
                    value={template}
                    onChange={this.handleChange}>
                        <option value="" disabled> Pasirinkite šabloną</option>
                        {listTemplates}
                  </select>       
                </div>
                <div className="input"> 
                    <FormLabel>Dokumento numeris</FormLabel>
                    <FormControl 
                        type="text" 
                        name="docNum"
                        value={docNum}
                        placeholder="Įveskite dokumento Nr."
                        onChange={this.handleChange}
                    />                                
                </div>
                <div className="input"> 
                    <FormLabel>Dokumento pavadinimas</FormLabel>
                    <FormControl 
                        type="text" 
                        name="docName"
                        value={docName}
                        placeholder="Įveskite dokumento pavadinimą"
                        onChange={this.handleChange}
                    />                                
                </div>
                <div className="input"> 
                    <FormLabel>Siuntėjas</FormLabel>
                    <FormControl 
                        type="text" 
                        name="name"
                        value={name}
                        placeholder="Įveskite vardą"
                        onChange={this.handleChange}
                    />                                
                </div>
                <div className="recipient"> 
                  <FormLabel>Kam išsiųsti</FormLabel>
                  <select 
                    name="recipient"
                    value={recipient}
                    onChange={this.handleChange}>
                        <option value="" disabled> Pasirinkite gavėją</option>
                        <option>{listRecipients}</option>
                  </select>              
                </div>
                <div className="docBtn">
                  <Button variant="primary" type="submit" onSubmit={(e)=>this.handleClickSend(e)}>
                      Pateikti
                  </Button>
                  {/* <Button variant="success" type="submit" onSubmit={() =>this.handleClickSave()}>
                      Saugoti
                  </Button> */}
                </div> 
              </Form>
            </div>
        );
    }
    
    componentDidMount(){
        this.fetchDataDocTemplates()
        this.fetchDataRecipients()
    }

    //užklausa dokumentų šablonų sąrašui gauti. Ant ko kviesti?
    fetchDataDocTemplates = async () => {
      const res = await fetch("http://localhost:8086/doctemplates/get/all", 
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await res.json();
      console.log("ar tai šablonų sąrašas " + JSON.stringify(json));
      this.setState({
        template: json,
      });
      console.log(this.state.template)
    }

    fetchDataRecipients = async () => {
      const res = await fetch("http://localhost:8086//recipients",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await res.json();
      console.log("ar tai gavėjų sąrašas " + JSON.stringify(json));
      this.setState({
        recipients: json,
      });
      console.log(this.state.recipients)
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };
      this.setState({
        [name]: value,
        formErrors, 
          [name]: value 
      });
    } 

    handleClickSend = async (e) =>{
      e.preventDefault();
//existing value turi ateiti iš text editoriaus. Kur ten padėti this.state.?
        const token = localStorage.getItem("token");
        const data = await localStorage.getItem('content');
        await console.log(JSON.stringify({content: data}))
        const API = 'http://localhost:8086/document/add';
        fetch(API, {
          method: 'POST',
          headers: {
            "token": token,
            "content-type": "Application/json",
          },
          body: JSON.stringify({content: data, typeId: 1}),
        }).then(response => {
//Kaip suformuoti būsenos pakeitimą?
          if (response.status === 200){
            this.nextPath(`/userboard`);
          } else {
            alert("Pateikti nepavyko");
          }
        }).catch(error => console.error(error));   
      }

      handleClickSave = async (e) =>{
        e.preventDefault();
//existing value turi ateiti iš text editoriaus. Kur ten padėti this.state.?
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

export default withRouter(NewDocForm);