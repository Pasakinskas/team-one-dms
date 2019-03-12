import React, { Component } from 'react';

import UserSelector from './UsersSelector';
// api - group list
<<<<<<< HEAD
const API_TEST = 'https://reqres.in/api/users?page=2';
const API = 'https://localhost:8086/groups'
// api_add_user adress to add user to group
const API_ADD_USER = 'https://localhost:8086/groups';
const API_REMOVE_USER = 'https://localhost:8086/groups';
const API_REMOVE_GROUP = 'https://localhost:8086/group';
=======
const API = 'https://reqres.in/api/users?page=2';
// api_add_user adress to add user to group
const API_ADD_USER = 'https://localhost:8086/group/user/add';
const API_REMOVE_USER = 'https://localhost:8086/group/user/remove';
const API_REMOVE_GROUP = 'https://localhost:8086/group/remove';
>>>>>>> 421e9ba60834e2b8bfb8f6c7201165f407d05f62
const DEFAULT_QUERY ='';

export default class GroupManagerData extends Component {
    constructor(props) {
        super(props);

        this.state={
            //value id from option which is user id
            userId: "",
            groupId: "",
            data: [], 
            isLoading: false,
            error: null,
            selectedOption: null,
<<<<<<< HEAD
            optionValue:"",
=======
>>>>>>> 421e9ba60834e2b8bfb8f6c7201165f407d05f62
            show: false,
            isRemove: false,
        };
    };
<<<<<<< HEAD
    handleInputChange = (newValue) => {
        const optionValue = newValue.replace(/\W/g, '');
        this.setState({optionValue});
        return optionValue;
    };
=======
  
>>>>>>> 421e9ba60834e2b8bfb8f6c7201165f407d05f62
    handleChange = (event,groupId) =>{
        this.setState({
            userId: event.target.value,
            groupId:groupId,
        });
//remove console.log for testing
        console.log('Option selected:',event.target.value,' Group id: ', groupId);
    }

//showing groups table with opions
    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(API + DEFAULT_QUERY)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Coudn't connect to API ...");
            }
          })
        .then(response => this.setState({
          data: response.data,  
          isLoading:false
        }))
          .catch(error => this.setState({ error, isLoading: false }));

<<<<<<< HEAD
          // whats here?
    }

//options for selector
    

// adding user from selector
    addUsers = async (event) =>{
        event.preventDefault();
        try{
            const res = await fetch(API_ADD_USER, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userid":this.state.userId,
                "groupid":this.state.groupId,
                "add":true,
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
      }

    removeUsers = async (event) =>{
        event.preventDefault();
        try{
            const res = await fetch(API_REMOVE_USER, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userId":this.state.userId,
                "groupId":this.state.groupId,
                "add":false,
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
      }

    removeGroup = async (event, groupId) =>{
        event.preventDefault();
        //const {isRemove} = this.state;
//placeholder for modal aditional confirmation state
        if(true){
            try{
            const res = await fetch(`https://localhost:8086/group/${groupId}` , {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                },
                /*body: JSON.stringify({
                    "groupId":groupId,
                }),*/
=======
// adding user from selector
    addUsers = async (event) =>{
        event.preventDefault();
        try{
            const res = await fetch(API_ADD_USER, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userId":this.state.userId,
                "groupId":this.state.groupId,
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
      }

    removeUsers = async (event) =>{
        event.preventDefault();
        try{
            const res = await fetch(API_REMOVE_USER, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userId":this.state.userId,
                "groupId":this.state.groupId,
            }),
            })
            const statusCode = await res.status;
            return statusCode;
        }catch(err){console.log(err)};
      }

    removeGroup = async (event, groupId) =>{
        event.preventDefault();
        const {isRemove} = this.state;
//placeholder for modal aditional confirmation state
        if(true){
            try{
            const res = await fetch(API_REMOVE_GROUP, {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "groupId":groupId,
                }),
>>>>>>> 421e9ba60834e2b8bfb8f6c7201165f407d05f62
              })
      //remove console.log for testing
              console.log("You want to remove group with id: ",groupId);
              const statusCode = await res.status;
              return statusCode;
            }catch(err){console.log(err)};
        }
        
      }

    render(){
<<<<<<< HEAD
        const { data, isLoading, error } = this.state;
=======
        const { data, isLoading, error, isRemove } = this.state;
>>>>>>> 421e9ba60834e2b8bfb8f6c7201165f407d05f62
        let i =1;
        function row(){
        return i++;
        }
        if(error){
        return <tr><td><p>{error.message}</p></td></tr>;
        }
        if (isLoading) {
        return <tr><td><p>Kraunama ...</p></td></tr>;
        }
        if(data == null){
            return(
                <p>Server connection error...</p>
            )
        }else{
        return(
            data.map(data => 
                <tr key={data.id}>
                    <th scope='row'>{row()}</th>
                    <td>{data.first_name}</td>
                    <td><form className="table-form" onSubmit={this.addUsers}>
<<<<<<< HEAD
                        <select
=======
                        <select 
>>>>>>> 421e9ba60834e2b8bfb8f6c7201165f407d05f62
                        name="user"
                        className="selectpicker" 
                        onChange={(e) => this.handleChange(e, data.id)}
                        >
                        <UserSelector/>
                        </select>
                    <input 
                    type="submit" 
                    className="btn btn-success" 
                    value="Pridėti narį"/>
                    </form>
                </td>
                <td><form className="table-form" onSubmit={this.removeUsers}>
                <select 
                        name="user"
                        className="selectpicker" 
                        onChange={(e) => this.handleChange(e, data.id)}
                        >
                        <UserSelector/>
                        </select>
                    <input 
                    type="submit" 
                    className="btn btn-dark" 
                    value="Pašalinti narį"/>
                    </form>
                </td>
                <td>
                <input 
                    type="submit" 
                    onPointerDown={(e) => this.removeGroup(e, data.id)} 
                    className="btn btn-danger" 
                    value="Pašalinti grupę"/>
                </td>
                </tr>
                )
        )}
    }

}