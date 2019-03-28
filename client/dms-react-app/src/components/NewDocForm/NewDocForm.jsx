import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './NewDocForm.css';
import TemplateSelector from '../documentTypesUI/TemplateSelector';
import { withRouter } from 'react-router-dom';


class NewDocForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          docNum:"",
          docName:"",
          name: "",
          doc:[],
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

        const groupRecipients = this.state.groupRecipients.map((groups) =>
        <option parent="group" id={groups.id} key={"group," + groups.name}>{groups.name}</option>);

        const userRecipients = this.state.userRecipients.map((users) =>
        <option parent="user" id={users.id} key={"user," + users.name}>{users.name}</option>);

        return (
            <div className="form-wrapper" id="form">
             <Form onSubmit={(e)=>{this.handleClickSave(e)}}>
                <div className="template">
                  <FormLabel>Dokumento šablonas</FormLabel>
                  <select
                    name="template"
                    onChange={this.handleTemplateChange}>
                        <option value="" disabled> Pasirinkite šabloną</option>
                        <TemplateSelector/>
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
                    onChange={this.handleRecipientChange}>
                        <option> Pasirinkite gavėją</option>
                        {groupRecipients},
                        {userRecipients}
                  </select>
                </div>
                <div className="docBtn">
                  <Button variant="primary" type="submit" onSubmit={(e)=>this.handleClickSave(e)}>
                      Saugoti
                  </Button>
                </div>
              </Form>
            </div>
        );
    }

    updateEditorValue = (value) =>{
        this.props.updateEditorValue(value);
    }

    componentDidMount(){
        this.fetchDataDocTemplates();
        this.fetchDataRecipients();
    }

    //Get All document templates
    fetchDataDocTemplates = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8086/doctemplates/get/all",
      {
        method: "GET",
        headers: {
          "token" : token,
          "content-type": "application/json",
        },
      });
      const json = await res.json();
      this.setState({
        template: json,
      });
    }

    //Get All recipients
    fetchDataRecipients = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8086/recipients",
      {
        method: "GET",
        headers: {
          "token": token,
          "content-type": "application/json",
        },
      });
      const json = await res.json();
      this.setState({
        groupRecipients:json.groups,
        userRecipients:json.users,
      });
    }

    handleTemplateChange = (e) => {
      const {value, name } = e.target;
      console.log("SELECTED DOC: "+ value);
      this.setState({
        "doc_id":value
      });
      this.onSubmit(value);
    }

    // on submit GET template json using id
    onSubmit  = async (id) =>{
      const token = localStorage.getItem("token");
      console.log("Select option selected");
    // text editor on change saves to session storage
    try{
      const res = await fetch(`http://localhost:8086/doctemplates/get/byId?id=${id}`, {
        method: 'GET',
        headers:{
          "token": token,
          "content-type": 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    })
      const statusCode = await res.status;
      const json =  await res.json();
      this.setState({
          "doc":json.template,
      })
    this.updateEditorValue(this.state.doc);
    return statusCode;
        }catch(err){console.log(err)};
        try{
            const document = (this.state.doc)
            console.log(document);
        }catch(err){console.log(err);};
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

    handleRecipientChange = (e) => {
      this.setState({
        recipientType: e.target.options[e.target.options.selectedIndex].getAttribute("parent"),
        recipient: e.target.options[e.target.options.selectedIndex].getAttribute("id")
      });
    }

    handleClickSave = async (e) =>{
      e.preventDefault();
        const docNum = this.state.docNum;
        const docName = this.state.docName;
        const recipientType = this.state.recipientType;
        const recipient = this.state.recipient;
        const token = localStorage.getItem("token");
        const data = await localStorage.getItem('content');
        const API = 'http://localhost:8086/document/put/new';

        const body = JSON.stringify({content: data, typeId: 1, name: docName, number: docNum, recipientType: recipientType, recipient: recipient});

        fetch(API, {
          method: 'PUT',
          headers: {
            "content-type": "application/json",
            "token": token,
          },
          body: body
        }).then(response => {
          if (response.status === 200){
            this.nextPath(`/userboard`);
          } else {
            alert("Pateikti nepavyko");
          }
        }).catch(error => console.error(error));
      }
 }

export default withRouter(NewDocForm);