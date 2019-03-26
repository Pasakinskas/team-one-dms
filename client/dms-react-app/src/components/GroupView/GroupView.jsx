import React, { Component } from 'react';
import {Card, ListGroup, FormLabel} from 'react-bootstrap';
import './GroupView.css';


class GroupView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          groupRecipients: [],
          myGroups: [],
        }
    }
    render() {
        const listGroups = this.state.groupRecipients.map((groups) =>
        <li className="list-group-item">{groups.name}</li> );
        
        // const listMyGroups = this.state.myGroups.map((mg) =>
        // <li className="list-group-item">{mg.name}</li> );

        return (
            <div className="group">
                <Card className="allGroups">
                <FormLabel className="GroupLabel">Mano padaliniai</FormLabel>
                <ListGroup variant="flush">
                    {/* {listMyGroups}*/}
                    <li className="list-group-item">aaa</li>
                    <li className="list-group-item">sss</li>
                    <li className="list-group-item">ddd</li>
                    <li className="list-group-item">fff</li>
                </ListGroup>
                </Card>
                <Card className="myGroups">
                <FormLabel className="GroupLabel">Visi padaliniai</FormLabel>
                <ListGroup variant="flush">
                    {listGroups}
                </ListGroup>
                </Card>
            </div>
        );
    }

  componentDidMount(){
      this.fetchAllGroups()
  }
    
  fetchMyGroups = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8086/recipients",
    {
      method: "GET",
      headers: {
        "token" : token,
        "content-type": "application/json",
      },
    });
    const json = await res.json();
    this.setState({
      myGroups:json.groups,       
    });
  }
  
  fetchAllGroups = async () => {
    const res = await fetch("http://localhost:8086/recipients",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await res.json();
    this.setState({
      groupRecipients:json.groups,       
    });
  }
}

export default GroupView;