import React, { Component } from 'react';
import {Button, Navbar, Nav, Form } from 'react-bootstrap';
import './AdminNavBar.css';
import { withRouter } from 'react-router-dom';

class AdminNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bgColor: "",
          isClicked: false,
        }
      }
    
    nextPath = (path)=>{
        this.props.history.push(path);
    }
    
    render() {
        return (
            <div>
                <Navbar variant="dark">
                <Nav className="mr-auto">
                    <li style={{backgroundColor: this.state.bgColor}}><a href="/adminboardgroups">Grupės</a></li>
                    <li><a href="/adminboarddocs">Dokumentai</a></li>
                    <li><a href="/adminboardusers">Vartotojai</a></li>
                    <li><a href="/adminboardtemplates">Dokumentų šablonai</a></li>
                </Nav>
                <Form inline>
                    <Button className="SignOut" variant="outline-info" onClick={() =>this.nextPath(`/login`)}>Atsijungti</Button>
                </Form>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(AdminNavBar);