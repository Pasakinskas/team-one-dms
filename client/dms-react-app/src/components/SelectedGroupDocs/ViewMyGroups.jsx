import React, { Component } from 'react';
import {Card, ListGroup, FormLabel} from 'react-bootstrap';
import '../GroupView/GroupView';


export default class ViewMyGroups extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          groups: {},
          myGroups: {},
        }
    }
    render() {

        const {data} = this.state;
        // const listGroups = this.state.groups.map((label) =>
        // <option>{label}</option> );
        
        // const listMyGroups = this.state.myGroups.map((label) =>
        // <option>{label}</option> );

        return (
            <div className="group">
                <Card className="myGroups">
                <FormLabel className="GroupLabel">Mano padaliniai</FormLabel>
                <ListGroup variant="flush">
                    { <li className="list-group-item" key="id">{this.propslistGroups}</li> }
                </ListGroup>
                </Card>
            </div>
        );
    }

    fetchAllGroups = async (url) => {
        const res = await fetch("http://localhost:8086/groups", 
        {
          method: "GET",
          headers: {
            "token": this.props.token,
            "content-type": "Application/json",
          },
        });
        if (res.status > 300) {
          alert("Fail")
        }
        const groupsJson = await res.groupsJson();
        this.setState({ 
          groups: groupsJson
        });
        return groupsJson;
    }

    fetchMyGroups = async (url) => {
        const res = await fetch("http://localhost:8086/groups/",  
        // + this.props.user.id, 
        {
          method: "GET",
          headers: {
            "content-type": "Application/json",
          },
        });
        const myGroupsJson = await res.myGroupsJson();
        this.setState({ 
          groups: myGroupsJson
        });
        return myGroupsJson;
    }
}