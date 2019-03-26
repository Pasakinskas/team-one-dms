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
          docNum:"",
          docName:"",
          name: "", 
          template: [],    
          groupRecipients:[],
          userRecipients:[], 
        }
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
        const {docNum, docName, name} = this.state;
        const listTemplates = this.state.template.map((template) =>
        <option>{template.description}</option> );
        
        const groupRecipients = this.state.groupRecipients.map((groups) =>
        <option key={groups.name}>{groups.name}</option>);

        const userRecipients = this.state.userRecipients.map((users) =>
        <option key={users.name}>{users.name}</option>);

        // const listRecipients = this.state.recipients.map((recipients) => <option>{recipients.groups}, {recipients.users}</option>);
        //const listRecipients = this.state.recipients.map((groups, users) =><p>{groups}</p>);
        //const listRecipients = this.state.recipients.Object.keys(this.state.recipients.groups).map((groups) =>{console.log("Ar tai grupės? " + groups.groups)});
        // const listRecipients = this.state.recipients.map(())
        // const data = this.state.recipients;
        // const parsintas = JSON.parse(data);
        // console.log(parsintas);
        //const listRecipients = this.state.recipients.map(recipient =><option>{recipient.users}</option> );
        // const listRecipients = this.state.recipients.map(fe => (
        //   <ul>
        //     {fe.groups.map(li => (
        //       <li>{li.name}</li>
        //     ))}
        //     {fe.users.map(lili => (
        //       <li>{lili.name}</li>
        //     ))}
        //   </ul>
        // ))

        return (
            <div className="form-wrapper" id="form">
             <Form onSubmit={(e)=>{this.handleClickSend(e)}}>
                <div className="template"> 
                  <FormLabel>Dokumento šablonas</FormLabel>
                  <select 
                    onChange={this.handleChange}>
                        <option> Pasirinkite šabloną</option>
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
                    onChange={this.handleChange}>
                        <option> Pasirinkite gavėją</option>
                        {groupRecipients},
                        {userRecipients}
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
        this.fetchDataDocTemplates();
        this.fetchDataRecipients();
    }

    //užklausa dokumentų šablonų sąrašui gauti
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
      const res = await fetch("http://localhost:8086/recipients",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await res.json();
      console.log("ar tai gavėjų sąrašas " + JSON.stringify(json))
      this.setState({
        groupRecipients:json.groups,
        userRecipients:json.users,
        
      });
      console.log("groups " + JSON.stringify(this.state.groupRecipients)); 
      console.log("users " + JSON.stringify(this.state.userRecipients));
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
        const API = 'http://localhost:8086/document/';
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