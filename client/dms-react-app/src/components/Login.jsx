import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          formErrors: {
            email: "",
            password: ""
          }
        };
    }

  nextPath = (path)=>{
    this.props.history.push(path);
  }

  fetchDataLogin = async (url) => {
    const res = await fetch("http://localhost:8086", {
      
      method: "POST",
      headers: {
        "content-type": "Application/json",
      
      },
      body: {
        "email": this.state.email,
        "password": this.state.password,
      }
    });
    const json = await res.json();
    return json;
  }

  render() {
      const { password, email, formErrors } = this.state;
      return (
          <div className="wrapper">
            <div className="form-wrapper">
              <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <div className="email"> 
                  <FormLabel>El. paštas</FormLabel>
                  <FormControl 
                      className={formErrors.email.length > 0 ? "error" : null} 
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
                <div className="password">
                  <FormLabel>Slaptažodis</FormLabel>
                  <FormControl  className={formErrors.password.length > 0 ? "error" : null}
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
                <div className="login">
                  <Button variant="primary" type="submit" >
                      Prisijungti
                  </Button>
                </div> 
              </Form>
            </div>
          </div>
      );
  }

  handleSubmit = (e) => {
    console.log("fefekaka")
      e.preventDefault();
      if (this.formValid()) {
        console.log(this.formValid())
          const loginanswerfrombackend = this.fetchDataLogin();
          console.log(loginanswerfrombackend);
          eval(loginanswerfrombackend);
      } 
  };
    
  eval(isRegGood){
    isRegGood === 201||200
    ? alert("Prisijungimas pavyko, prisijunkite") && this.nextPath(`/userboard`)
    : alert("Prisijungimas nepavyko, bandykite vėliau dar kartą")
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
      switch (name){
          case "email":
          const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
          formErrors.email = emailPattern.test(value)
              ? ""
              : "Nepilnas el. paštas";
          break;
          case "password":
          formErrors.password = value.length < 7
              ? "mažiausias simbolių skaičius 7" 
              : "";
              console.log("paswordo reikšmė "+value);
          break;
          default:
          break;
      }
  }
  
  formValid = (e) => {
      const { password, email } = this.state;
      if(email.length&&password.length !== 0){
        console.log("pasword ilgis "+password.length)
        return true;
      }else{
        console.log(password.length, email.length)
        alert("Visi laukai turi būti užpildyti");
        return false;
      }
  };
}

export default withRouter(Login);