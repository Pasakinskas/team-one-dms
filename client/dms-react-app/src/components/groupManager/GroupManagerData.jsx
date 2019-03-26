import React, { Component } from 'react';

import UserSelector from './UsersSelector';
// api - group list
const API_TEST = 'https://reqres.in/api/users?page=2';
const API = 'http://localhost:8086/groups'
// api_add_user adress to add user to group
const API_ADD_USER = 'http://localhost:8086/groups';
const API_REMOVE_USER = 'http://localhost:8086/groups';
const API_REMOVE_GROUP = 'http://localhost:8086/group';
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
            optionValue:"",
            show: false,
            isRemove: false,
        };
    };
    handleInputChange = (newValue) => {
        const optionValue = newValue.replace(/\W/g, '');
        this.setState({optionValue});
        return optionValue;
    };
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
//setting auth for testing
        localStorage.setItem("authority","admin")
          this.fetchGroups();
          
    }

    fetchGroups = async () =>{
        const token = localStorage.getItem('token');
        const res = await fetch(API, {
            method: 'GET',
            headers:{
                    'content-type':'Application/json',
                    token:token,
            },
            })
            const statusCode = await res.status;
            console.log(res);
            const json =  await res.json();
           // console.log(json);
            this.setState({
                "data":json
            })
            this.setState({ isLoading: false });
            return statusCode;
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
              })
      //remove console.log for testing
              console.log("You want to remove group with id: ",groupId);
              const statusCode = await res.status;
              return statusCode;
            }catch(err){console.log(err)};
        }
        
      }

    render(){
        const { data, isLoading, error } = this.state;
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
                    <td>{data.name}</td>
                    <td><form className="table-form" onSubmit={this.addUsers}>
                        <select
                        name="user"
                        className="selectpicker" 
                        onChange={(e) => this.handleChange(e, data.id)}
                        >
                        {<UserSelector/>}
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
                    value="Pašalinti padalinį"/>
                </td>
                <td>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                <label class="form-check-label" for="defaultCheck2">
                Leisti gauti/pateikti
                </label>
                </div>
                </td>
                </tr>
                )
        )}
    }

}