import React, { Component } from 'react';
import {Button, Form, FormLabel } from 'react-bootstrap';
import './DocManagerForm.css';
import { withRouter } from 'react-router-dom';
import TemplateSelector from './TemplateSelector';
import { Editor}  from 'slate-react';
import { Value } from 'slate';
//temporary doc example

const API_TEMPLATE = "http://localhost:8086/template/"

//temporary doc example

let testValue;

class ViewTemplates extends Component {
    constructor(props) {
        super(props);   
        this.state = {
          doc_name: "",
          doc_id:"",
          doc:[],
        }
    }

    updateEditorValue = (value) =>{
        this.props.updateEditorValue(value);
    }

// on submit GET template json using id
    onSubmit  = async (id) =>{
        console.log("Select option selected");
// text editor on change saves to session storage
        try{
            const res = await fetch(`http://localhost:8086/doctemplates/get/byId?id=${id}`, {

            content:'application/x-www-form-urlencoded; charset=UTF-8',
            method: 'GET',
            token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyaWQiLCJpZCI6M30.N_sFZI-6YgGcoh7j_VQFHzp4VBmJhKtyoXTYZbZ9pos',
          })
            const statusCode = await res.status;
            const json =  await res.json();
            this.setState({
                "doc":json.template,
            })
            this.updateEditorValue(this.state.doc);
            return statusCode;

        }catch(err){console.log(err)};
//clear for cleanup
        try{
            const document = JSON.stringify(testValue)
            console.log(this.state.doc);
            //sessionStorage.setItem('content',document);
            //this.updateEditorValue(this.state.doc);
        }catch(err){console.log(err);};
      }

//remove template
      removeTemplate = async (event) =>{
        event.preventDefault();
        const {doc_id} = this.state;
        console.log("Remove button pressed");
// curently takes local storage value for testing value -> editor
        testValue = JSON.parse(localStorage.getItem('content'));
      // testValue = await this.props.newEditorVar;
// after parse, stringify the value then send via POST
        console.log(JSON.stringify(testValue))
        try{
            const res = await fetch(`http://localhost:8086/template/${doc_id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            },
            })
            const statusCode = await res.status;
            return statusCode;

        }catch(err){console.log(err)};
      }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
       // const {name} = this.state;
        return (
            <div className="form-wrapper" id="form">
             <Form>
                <div className="name"> 
                    <FormLabel>Šablono pavadinimas</FormLabel>
                    <select 
                        type="text" 
                        name="template_name"
                        placeholder="Įveskite pavadinimą"
                        onChange={this.handleChange}
                    >
                    <TemplateSelector/>
                    </select>                              
                </div>
                <div className="docBtn">
                  <Button variant="danger" type="button" onPointerDown={(e)=>this.removeTemplate(e)} name="remove">
                      Pašalinti
                  </Button>
                </div> 
              </Form>
              
            </div>
        );
    }

    handleChange = (e) => {
      const {value, name } = e.target;
      console.log("SELECTED DOC: "+ value);
      this.setState({
        "doc_id":value
      });
      this.onSubmit(value);
    } 
}

export default withRouter(ViewTemplates);