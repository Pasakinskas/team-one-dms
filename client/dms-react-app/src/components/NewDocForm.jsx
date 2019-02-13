import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import '../css/NewDocForm.css';
import { withRouter } from 'react-router-dom';
import DataPicker from './DataPicker'

class NewDocForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          shablon: "",
          name: "",
          recipient: "",
        }
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }
   
    render() {
        const {shablon, name, recipient } = this.state;
        return (
            <div className="form-wrapper" id="form">
             <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <div className="shablon"> 
                  <FormLabel>Dokumento šablonas</FormLabel>
                  <select 
                    placeholder="Pasirinkite pareigas" 
                    name="shablon"
                    value={shablon}
                    onChange={this.handleChange}>
                        <option value="" disabled> Pasirinkite šabloną</option>
                        <option value="A">Prašymas išleisti atostogų</option>
                        <option value="B">Prašymas priimti į darbą</option>
                        <option value="C">Prašymas atleisti iš darbo</option>
                        <option value="D">Pasiaiškinimas</option>
                  </select>       
                </div>
                <div className="name"> 
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
                        <option value="A">Jonas</option>
                        <option value="B">Paulius</option>
                        <option value="C">Petras</option>
                        <option value="D">Someone</option>
                  </select>              
                </div>
                <div className="date">
                  <FormLabel>Data nuo</FormLabel>
                  <DataPicker id="DatePicker"/>                 
                </div> 
                <div className="date">
                  <FormLabel>Data iki</FormLabel>
                  <DataPicker id="DatePicker"/>                 
                </div> 
                <div className="docBtn">
                  <Button variant="secondary" type="submit" onClick={() =>this.nextPath(`/userboard`)}>
                      Peržiūrėti
                  </Button>
                  <Button variant="primary" type="submit" onClick={() =>this.nextPath(`/userboard`)}>
                      Pateikti
                  </Button>
                  <Button variant="success" type="submit" onClick={() =>this.nextPath(`/userboard`)}>
                      Saugoti
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

export default withRouter(NewDocForm);