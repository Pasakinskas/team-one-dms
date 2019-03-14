import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: {},
          email: "",
          password: "",
          text:"oooooo",
          formErrors: {
            email: "",
            password: ""
          },
        };
    }

  render() {
      const { password, email, formErrors } = this.state;
      return (
          <div className="wrapperLogin">
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

  nextPath = (path)=>{
    this.props.history.push(path);
  }

  handleSubmit = async (e) => {
      e.preventDefault();
      if (this.formValid()) {
        // this.props.handleDatafromChild(this.state.test, this.state.email, this.state.password);
        console.log(this.props.text);
        const fetchUserData = await this.props.fetchUserData;
        const res = await fetchUserData();
        const status = this.props.response;
        console.log(status);
        this.evalRes(status);
      } 
  };
    
  evalRes = (isRegGood)=>{
    isRegGood === 200
    ? this.nextPath(`/userboard`)
    : alert("Prisijungimas nepavyko, bandykite vėliau dar kartą")&& this.nextPath(`/`)
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
          const emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
          formErrors.email = emailPattern.test(value)
              ? ""
              : "Nepilnas el. paštas";
          break;
          case "password":
          formErrors.password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,50}/.test(value) 
              ? "" 
              : "Neteisingas slaptažodis";
          break;
          default:
          break;
      }
  }
  
  formValid = (e) => {
      const { password, email } = this.state;
      if(email.length&&password.length !== 0){
        return true;
      }else{
        alert("Visi laukai turi būti užpildyti");
        return false;
      }
  };
}

export default withRouter(Login);