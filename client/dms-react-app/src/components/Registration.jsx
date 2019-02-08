import React, { Component } from 'react';
import Select from 'react-select';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import '../css/Registration.css';

const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;


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
        password: "",
        passwordrep: ""
      },
      jobPositions: [
        { label: 'Generalinis direktorius', value: 1 },
        { label: 'Personalo vadovas', value: 2 },
        { label: 'Administratorius', value: 3 },
        { label: 'Sistemų administratorius', value: 4 },
        { label: 'IT specialistas', value: 5 },
        { label: 'Valytoja', value: 6 },
      ]
    };
  }

  fetchData = async (url) => {
    const res = await fetch("http://localhost:8086", {
      headers: {
        "content-type": "Application/json",
        "method": "POST",
      },
      body: {
        "name": this.state.name,
        "surname": this.state.surname,
        "email": this.state.email,
        "position": this.state.position
      }
    });
    const json = await res.json();
    return json;
  }

  render() {
    const { name, surname, position, password, passwordrep, email, formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
            <div className="name"> 
              <FormLabel>Vardas</FormLabel>
              <FormControl 
                  type="text" 
                  name="name"
                  value={name}
                  placeholder="Įveskite vardą"
                  //required
                  onChange={this.handleChange}
              />  
              {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
              )}                                 
            </div>
            <div className="surname"> 
              <FormLabel>Pavardė</FormLabel>
              <FormControl 
                  type="text" 
                  name="surname"
                  placeholder="Įveskite pavardę"
                  value={surname}
                  onChange={this.handleChange}                  
                  //required
              />
              {formErrors.surname.length > 0 && (
                  <span className="errorMessage">{formErrors.surname}</span>
              )}                                   
            </div>
            <div className="email"> 
              <FormLabel>El. paštas</FormLabel>
              <FormControl 
                  type="email" 
                  name="email"
                  placeholder="Įveskite el. paštą"
                  value={email}
                  onChange={this.handleChange}
                  //required
              /> 
              {formErrors.email.length > 0 && (
                 <span className="errorMessage">{formErrors.email}</span>                        
              )}                                    
            </div>
            {/* <div className="position">
              <FormLabel>Pareigos</FormLabel>
              <Select 
                  placeholder="Pasirinkite pareigas" 
                  name="position"
                  options = { this.state.jobPositions } 
                  onChange={this.handleChange}
                  value={position}
                  required
              />
            </div> */}
            <div className="password">
              <FormLabel>Slaptažodis</FormLabel>
              <FormControl  
                  type="password" 
                  placeholder="Įveskite slaptažodį"
                  name="password"
                  value= {password}
                  onChange={this.handleChange}
                  //required
              />
              {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
              )}
            </div> 
            <div className="passwordrep">
              <FormLabel>Pakartoti slaptažodį</FormLabel>
              <FormControl
                  type="password" 
                  placeholder="Pakartokite slaptažodį"
                  name="passwordrep"
                  value= {passwordrep}
                  onChange={this.handleChange}
                  //required
              />
              {formErrors.passwordrep.length > 0 && (
                  <span className="errorMessage">{formErrors.passwordrep}</span>
              )}
            </div> 
            <div className="register">
              <Button variant="primary" type="submit">
                  Registruotis
              </Button>
            </div> 
          </Form>
        </div>
      </div>      
    );
  }

handleChange = (e) => {
  e.preventDefault();
  const { name, value } = e.target;
  let formErrors = { ...this.state.formErrors };
  this.setState({
    [name]:value,
    formErrors, 
      [name]: value 
  });
  switch (name) {
    case "name":
    formErrors.name = /^[A-Za-z]+$/.test(value)
        ? ""
        : "Galima naudoti tik raides";
    break;
    case "surname":
    formErrors.surname = /^[A-Za-z]+$/.test(value)
        ? ""
        : "Galima naudoti tik raides";
    break;
    case "email":
    formErrors.email = emailPattern.test(value)
        ? ""
        : "Nepilnas el. paštas";
    break;
    case "password":
    formErrors.password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/.test(value) 
        ? "" 
        : "mažiausias simbolių skaičius 7 ne daugiau 13";
        console.log(value);
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


handleSubmit = (e) => {
  e.preventDefault();
  const { name, surname, password, passwordrep, email, position } = this.state;
  const passValid = this.passValid(password, 7,12);
  const allLetter = this.allLetter(name, surname);
  const validEmail = this.validEmail(email);
  const checkPassword = this.checkPassword(password, passwordrep);
  const formValid = this.formValid(this.state);
  // const isPositionFilled = this.isPositionFilled(position);
    if (formValid){
      if (passValid) {
        if (allLetter) {
          if (validEmail) {            
            if (checkPassword) {              
            } 
              //  if (isPositionFilled){                 
              //  }             
          }
        }
      }
    }
  return false
}

  passValid = (password,mx,my) => {
    const password_len = password.length;
    console.log(password_len);
    if (password_len >= my || password_len < mx) {
      alert("Slaptažodis neturi būti tuščias / ilgis nuo " +mx+ " iki " +my);
    return false;
    }
  return true;
  }

  allLetter = (name, surname) => { 
    if ((/^[A-Za-z]+$/.test(name)) && (/^[A-Za-z]+$/.test(surname))) {
      console.log('tik raides')
      return true;
    } else {
      alert('Galima naudoti tik raides');
      return false;
    }
  }

  validEmail = (email) => {
    if (emailPattern.test(email)) {
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

  // isPositionFilled = (position) => {
  //   const positionLen = position.length
  //   console.log(positionLen)
  //   if(position !== 0) {
  //     return true;
  //   } else {
  //     alert("Pareigos turi būti užpildytos");
  //     return false;
  //   } 
  // }

  
  formValid = (e) => {
    const { name, surname, password, passwordrep, email, position } = this.state;
    if(name.length&&surname.length&&email.length&&password.length&&passwordrep.length !== 0){
      console.log(name.length)
      return true;
    }else{
      console.log(name.length, email.length)
      alert("Visi laukai turi būti užpildyti");
      return false;
    }
  };
}
export default Registration;
