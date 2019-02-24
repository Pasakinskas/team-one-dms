import React, {Component} from 'react';

import {FormControl, Form} from 'react-bootstrap';

const API = "https://localhost:8086/group/add"

export default class AddGroup extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          alert : "",
        };
    }
    addGroup(event){
        event.preventDefault();
        const data = new FormData(event.target);
        let object = {};
        data.forEach(function(value, key){
        object[key] = value;
        });
        let json = JSON.stringify(object);
        fetch(API, {
          method: 'POST',
          body: json,
        }).then(response => {
          console.log(response.status);
          if(response.status === 201 || 200){
            console.log("Grupė pridėta");
          }
          else{
            console.log("Grupės pridėti nepavyko");
          }
        }).catch(error => console.error(error));
      }

    render(){
        const {alert} = this.state;
        return(
            <Form onSubmit={this.addGroup}>
            <div className="group-name">
            <FormControl 
                  type="text" 
                  name="group-name"
                  placeholder="Grupės pavadinimas"
                  onChange={this.handleChange}
              /> 
              <div className="alert"></div>
               <input 
                    className="table-button" 
                    type="submit" 
                    className="btn btn-dark" 
                    value="Pridėti grupę"/>
            </div>
            </Form>
        )
    }
}