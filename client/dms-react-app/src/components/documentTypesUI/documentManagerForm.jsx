import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './DocManagerForm.css';
import { withRouter } from 'react-router-dom';

const API_ADD_TEMPLATE2 = "http://localhost:8086/doctemplate/post/new";
const API_ADD_TEMPLATE = "http://localhost:8086/document/post/new";

class DocManagerForm extends Component {
    constructor(props) {
        super(props);   
        this.state = {
          doc_name: "",
        }
    }

// save template
    onSubmit  = async (event, editorValue) =>{
//setting auth for testing
        localStorage.setItem("authority","admin");
       
       
        event.preventDefault();
        console.log(this.state.doc_name);
//editorValue broken
//        console.log(JSON.stringify(editorValue));
        let data = editorValue;
// text editor on change saves to local storage which is then save
        const data2 = localStorage.getItem('content');
        let description = this.state.doc_name;
        try{
            const token = localStorage.getItem("token");
            console.log(token);
            console.log(data2);
            console.log(description);
            const res = await fetch(`http://localhost:8086/doctemplate/put/new`, {
           // content: "application/x-www-form-urlencoded; charset=UTF-8",
            method: 'PUT',
            headers:{
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'token': token
            },           
           /* body: JSON.stringify({
                description:this.state.doc_name,
                template:data2,
            }),*/
           body:`description=${this.state.doc_name}&template=${data2}`
            })
            const statusCode = await res.status;
            const json =  await res.json();
            console.log(json);
            return statusCode;
        }catch(err){console.log(err)};
        console.log("DATA: " + data2);
      }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
        const {name} = this.state;
        return (
            <div className="form-wrapper" id="form">
             <Form onSubmit={(e)=>{this.onSubmit(e, this.props.newEditorVar)}}>
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
        "doc_name":value,
      });
    } 
}

export default withRouter(DocManagerForm);