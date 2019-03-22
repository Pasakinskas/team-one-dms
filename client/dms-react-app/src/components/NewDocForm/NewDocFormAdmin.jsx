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
        const {template} = this.state;
        const listTemplates = this.state.template.map((label) =>
        <option>{label}</option> );
        return (
            <div className="form-wrapper" id="form">
            <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <div className="template"> 
                    <FormLabel>Dokumento šablonas</FormLabel>
                    <select 
                        name="template"
                        value={template}
                        onChange={this.handleChange}>
                            <option> Pasirinkite šabloną</option>
                            {listTemplates}                        
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
    fetchDataDocTemplates = async () => {
      const res = await fetch("http://localhost:8086/doctemplates/get/all", {
        
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
          const API = 'http://localhost:8086/doctemplate/post/new';
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