import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './DocManagerForm.css';
import { withRouter } from 'react-router-dom';

const API_ADD_TEMPLATE = "http://localhost:8086/template/add"

class DocManagerForm extends Component {
    constructor(props) {
        super(props);   
        this.state = {
          doc_name: "",
        }
    }

    onSubmit  = async (event, editorValue) =>{
        event.preventDefault();
        console.log("Button pressed");
        //console.log(this.props.editorValue);
        let data = editorValue;
// text editor on change saves to local storage which is then save
        const data2 = sessionStorage.getItem('content');
        try{
            const res = await fetch(API_ADD_TEMPLATE, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                doc_name:this.state.doc_name,
                doc:data,
            }),
            })
            const statusCode = await res.status;
            const json =  await res.json();
            console.log(json);
            return statusCode;
        }catch(err){console.log(err)};
        console.log("DATA: " + data);
      }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
        const {name} = this.state;
        return (
            <div className="form-wrapper" id="form">
             <Form onSubmit={(e)=>{this.onSubmit(e,this.props.editorValue)}}>
                <div className="name"> 
                    <FormLabel>Šablono pavadinimas</FormLabel>
                    <FormControl 
                        type="text" 
                        name="template_name"
                        value={name}
                        placeholder="Įveskite pavadinimą"
                        onChange={this.handleChange}
                    />                                
                </div>
                <div className="docBtn">
                  <Button variant="success" type="submit">
                      Išsaugoti
                  </Button>
                </div> 
              </Form>
            </div>
        );
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
}

export default withRouter(DocManagerForm);