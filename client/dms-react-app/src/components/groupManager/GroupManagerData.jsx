import React, { Component } from 'react';
import Select from 'react-select';

import UserSelector from './UsersSelector';

const API = 'https://reqres.in/api/users?page=2';
const DEFAULT_QUERY ='';

export default class GroupManagerData extends Component {
    constructor(props) {
        super(props);

        this.state={
            data: [], 
            isLoading: false,
            error:null,
            selectedOption: null,
        };
    };

    handleChange = (selectedOption) =>{
        this.setState({selectedOption});
        console.log('Option selected:',selectedOption);
    }

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
    }

    addUsers(){
        console.log('ADD users was clicked');
    }

    removeUsers(){
        console.log('REMOVE users was clicked');
    }

    removeGroup(){
        console.log('REMOVE group was clicked');
    }

    render(){
        const { data, isLoading, error, selectedOption } = this.state;
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
                    <td><select 
                        className="selectpicker" 
                        id="multiselect" 
                        value={selectedOption}
                        onChange={this.handleChange}
                        >
                        <UserSelector/>
                        </select>
                    <input 
                    className="table-button" 
                    type="submit" 
                    onPointerDown={value => this.addUsers()} 
                    className="btn btn-dark" 
                    value="Pridėti narį"/>
                </td>
                <td><select className="user-selector-g">
                    <UserSelector/>
                    </select>
                    <input 
                    className="table-button" 
                    type="submit" 
                    onPointerDown={value => this.removeUsers()} 
                    className="btn btn-dark" 
                    value="Pašalinti narį"/>
                </td>
                <td>
                <input 
                    className="table-button" 
                    type="submit" 
                    onPointerDown={value => this.removeGroup()} 
                    className="btn btn-dark" 
                    value="Pašalinti grupę"/>
                </td>
                </tr>
                )
        )}
    }

}