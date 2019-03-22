import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import './Registration.css';
import { withRouter } from 'react-router-dom';

class Registration extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      email: "",
      position: "",
      password: "",
      passwordrep: "",
      formErrors: {
        name:"",
        surname:"",
        email: "",
        position: "",
        password: "",
        passwordrep: ""
      },
    };
  }
  
  render() {
    const { name, surname, position, password, passwordrep, email, formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper-reg">
          <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
            <div className="name" id="boxes"> 
              <FormLabel>Vardas</FormLabel>
              <FormControl 
                  type="text" 
                  name="name"
                  value={name}
                  placeholder="Įveskite vardą"
                  onChange={this.handleChange}
              />  
              {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
              )}                         
            </div>
            <div className="surname" id="boxes"> 
              <FormLabel>Pavardė</FormLabel>
              <FormControl 
                  type="text" 
                  name="surname"
                  placeholder="Įveskite pavardę"
                  value={surname}
                  onChange={this.handleChange}                  
              />
              {formErrors.surname.length > 0 && (
                  <span className="errorMessage">{formErrors.surname}</span>
              )}                                   
            </div>
            <div className="email" id="boxes"> 
              <FormLabel>El. paštas</FormLabel>
              <FormControl 
                  type="email" 
                  name="email"
                  placeholder="Įveskite el. paštą"
                  value={email}
                  onChange={this.handleChange}
              /> 
              {formErrors.email.length > 0 && (
                 <span className="errorMessage">{formErrors.email}</span>                        
              )}                                    
            </div>
            <div className="position" >
              <FormLabel>Pareigos</FormLabel>
              <select 
                  name="position"
                  value={position}
                  onChange={this.handleChange}>
                <option value="" disabled> Pasirinkite pareigas</option>
                <option value="Generalinis direktorius">Generalinis direktorius</option>
                <option value="Personalo vadovas">Personalo vadovas</option>
                <option value="Administratoriu">Administratorius</option>
                <option value="Sistemų administratorius">Sistemų administratorius</option>
                <option value="IT specialistas">IT specialistas</option>
                <option value="Valytoja">Valytoja</option>
              </select>
            </div>            
            <div className="password" id="boxes">
              <FormLabel>Slaptažodis</FormLabel>
              <FormControl  
                  type="password" 
                  placeholder="Įveskite slaptažodį"
                  name="password"
                  value= {password}
                  onChange={this.handleChange}              
              />              
              {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
              )}
            </div> 
            <div className="passwordrep" id="boxes">
              <FormLabel>Pakartoti slaptažodį</FormLabel>
              <FormControl
                  type="password" 
                  placeholder="Pakartokite slaptažodį"
                  name="passwordrep"
                  value= {passwordrep}
                  onChange={this.handleChange}
              />
              {formErrors.passwordrep.length > 0 && (
                  <span className="errorMessage">{formErrors.passwordrep}</span>
              )}
            </div> 
            <div className="register" id="boxes">
              <Button variant="primary" type="submit">
                  Registruotis
              </Button>
            </div> 
          </Form>
        </div>
      </div>      
    );
  }
  nextPath = (path)=>{
    this.props.history.push(path);
  }

  fetchData = async () => {
    const res = await fetch("http://localhost:8086/users", {
      
      method: "POST",
      headers: {
        "content-type": "Application/json",
      
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        position: this.state.position,
        password: this.state.password
      })
    });
    const statusCode = await res.status;
    console.log(statusCode)
    return statusCode;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({
      [name]: value,
      formErrors, 
        [name]: value 
    });
    switch (name) {
      case "name":
      formErrors.name = /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)
          ? ""
          : "Galima naudoti tik raides";
      break;
      case "surname":
      formErrors.surname = /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)
          ? ""
          : "Galima naudoti tik raides";
      break;
      case "email":
      formErrors.email = /^[a-zA-Z0-9ąčęėįšųūžĄČĘĖĮŠŲŪŽ.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
          ? ""
          : "Nepilnas el. paštas";
      break;
      case "position":
      formErrors.position = value.length > 0
          ? ""
          : "Pasirinkite pareigas";
      break;
      case "password":
      formErrors.password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,50}/.test(value) 
          ? "" 
          : "mažiausias simbolių skaičius 7, privaloma bent viena Didžioji raidė ir skaičius";
      break;
      case "passwordrep":
      formErrors.passwordrep = value === this.state.password
          ? "" 
          : "Slaptažodžiai nesutampa";
      break;
      default:
      break;
    }
  }; 

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.formValidation()) {
      const answerfrombackend = await this.fetchData();
      this.evalRes(answerfrombackend);
    }
  }

  formValidation = () => {
    const { name, surname, password, passwordrep, email, position } = this.state;
    return (this.formValidEmptyFields(this.state) && 
            this.passValid(password, 7,50) &&
            this.allLetter(name, surname) &&
            this.validEmail(email) &&
            this.checkPassword(password, passwordrep) &&
            this.isPositionFilled(position)
            )
  }

  evalRes(statusCode){
    statusCode ===  201
    ? alert("Registracija pavyko, prisijunkite") && this.nextPath(`/userboard`)
    : alert("Registracija nepavyko, bandykite vėliau dar kartą")
  }

  formValidEmptyFields = (e) => {
    const { name, surname, password, passwordrep, email, position } = this.state;
    if(name.length&&surname.length&&email.length&&password.length&&
      passwordrep.length&&position.length !== 0){
      return true;
    }else{
      alert("Visi laukai turi būti užpildyti");
      return false;
    }
  }

  passValid = (password,minLen,maxLen) => {
    if (password.length >= maxLen || password.length < minLen) {
      alert("Slaptažodis neturi būti tuščias / ilgis nuo " +minLen+ " iki " +maxLen);
    return false;
    }
  return true;
  }

  allLetter = (name, surname) => { 
    if ((/^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(name)) && (/^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(surname))) {
      return true;
    } else {
      alert('Galima naudoti tik raides');
      return false;
    }
  }

  validEmail = (email) => {
    if (/^[a-zA-Z0-9ąčęėįšųūžĄČĘĖĮŠŲŪŽ]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      return true;
    } else {
      alert("El. paštą įvedėte neteisingai");
      return false;
    }
  }

  checkPassword = (password, passwordrep) => {
    if(password === passwordrep) {
      return true;
    } else {
      alert("Slaptažodžiai nesutampa");
      return false;
    } 
  }

  isPositionFilled = (position) => {
    if(position.length === 0) {
      alert("Pareigos turi būti užpildytos");
      return false;
    } 
      return true;    
  }
}

export default withRouter(Registration);
