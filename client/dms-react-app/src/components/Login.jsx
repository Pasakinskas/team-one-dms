import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
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
                    <Button variant="primary" type="submit">
                        Prisijungti
                    </Button>
                  </div> 
                </Form>
              </div>
            </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        const formValid = this.formValid(this.state);
        if (formValid) {
            console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
            `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };
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
                console.log(value);
            break;
        }
    }
    
    formValid = (e) => {
        const { password, email } = this.state;
        if(email.length&&password.length !== 0){
          console.log(password.length)
          return true;
        }else{
          console.log(password.length, email.length)
          alert("Visi laukai turi būti užpildyti");
          return false;
        }
    };
}

export default Login;