import React, { Component } from 'react';
import {Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Login.css';

//jei fecho responsas 400 tai nulūžta

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: [],
          token: "",
          response: "",
          authority: "",
          email: "",
          password: "",
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
            <div className="form-wrapper-login">
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
        const user = await this.fetchUserData();
        if (user) {
          const authority = await this.fetchUserAuthority();
          if (authority) {
            const roleList = authority.map(role => {
              return role.authority;
            })
            localStorage.setItem("authority", roleList);
            if (roleList.includes("ROLE_ADMIN")) {
              this.nextPath(`/adminboarddocs`);
            } else {
              this.nextPath(`/userboard`);
            }
          }
        }
      } else {
        alert("Prisijungimas nepavyko, bandykite vėliau dar kartą");
        this.nextPath(`/`);
      }

        // const fetchUserData = await this.fetchUserData;
        // const res = await fetchUserData();

        // const fetchUserAuthority = await this.fetchUserAuthority;
        // const res2 = await fetchUserAuthority();

        // const status = this.state.response;
        // this.props.handleDatafromChild(this.state.user, this.state.token, this.state.authority);
        // console.log("fetcho rezultatas " + res);
        // this.evalRes(status);
      // } 
  };
    
  // evalRes = (isRegGood)=>{
  //   isRegGood === 200
  //   ? this.nextPath(`/userboard`) 
  //   : alert("Prisijungimas nepavyko, bandykite vėliau dar kartą")&& this.nextPath(`/`)
  // }

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

  //userio duomenų gavimui ir setinimui
  fetchUserData = async () => {
    //pasidarau iš anksto data
    const data = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password
    });
    //spausdinu
    console.log("my data is: " + data)
    const res = await fetch("http://localhost:8086/login", 
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: data
    });
      if (res.status > 300) {
        alert("Prisijungimas nepavyko, neteisingas el. paštas arba slaptažodis")
        return;
      }
    const json = await res.json();
    console.log(res.status)
    console.log("visas useris" + JSON.stringify(json))
    const token = res.headers.get("token");
    console.log(token);
    localStorage.setItem("token", token);
    this.setState({
      user: json, 
      response: res.status,
      token: token,
    })
    return json;
  }

  fetchUserAuthority = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8086/roles/user", {
      method: "GET",
      headers: {
        "token": token,
        "content-type": "application/json"
      }
    });
    if (res.status == 200) {
      return res.json();
    } else {
      console.error("asked for roles and got bad status")
    }
  }
}
export default withRouter(Login);