import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './NewDocForm.css';
import { withRouter } from 'react-router-dom';


class NewDocFormAdmin extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          template: [],
        }
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
        const {template, name, recipient } = this.state;
        // const listTemplates = this.state.template.map((label) =>
        // <option>{label}</option> );
        return (
            <div className="form-wrapper" id="form">
            <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <div className="template"> 
                    <FormLabel>Dokumento šablonas</FormLabel>
                    <select 
                        name="template"
                        value={template}
                        onChange={this.handleChange}>
                            <option value="" disabled> Pasirinkite šabloną</option>
                            {/* <option>{listTemplates}</option> */}
                            <option value="A">Prašymas išleisti atostogų</option>
                            <option value="B">Prašymas priimti į darbą</option>
                            <option value="C">Prašymas atleisti iš darbo</option>
                            <option value="D">Pasiaiškinimas</option>
                    </select>
                </div>         
                <div className="sender"> 
                    <FormLabel>Šablono pavadinimas</FormLabel>
                    <FormControl 
                        type="text" 
                        name="title"
                        value={this.state.template.title}
                        placeholder="Įveskite šablono pavadinimą"
                        onChange={this.handleChange}
                    />                                
                </div>
                <div className="docBtn">
                  <Button variant="success" type="submit" onClick={() =>this.handleClickSave()}>
                      Išsaugoti šabloną
                  </Button>
                </div> 
              </Form>
            </div>
        );
    }
    componentDidMount(){
        this.fetchDataDocTemplates()
    }

    //užklausa dokumentų šablonų sąrašui gauti. Ant ko kviesti?
    fetchDataDocTemplates = async (url) => {
      const res = await fetch("http://localhost:8086/document/templates", {
        
        method: "GET",
        headers: {
          "content-type": "Application/json",
        },
      });
      const json = await res.json();
      return json;
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

    handleClickSave = async (e) =>{
        e.preventDefault();
          const data = this.props.existingValue;
          const API = 'localhost:8086/document/add';
          fetch(API, {
            method: 'POST',
            body: JSON.stringify({template: data}),
          }).then(response => {
            if(response.status === 200){
              this.nextPath(`/adminboardtemplates`);
              //išsaugoti į bazę nauju vardu kuris ateina iš inputo 
              //existing value turi ateiti iš text editoriaus. Kur ten padėti this.state.?
              //this.setState.text.value
            }else{
              alert("Išsaugoti nepavyko");
            }
          }).catch(error => console.error(error));
      }
 }

export default withRouter(NewDocFormAdmin);