import React, { Component } from 'react';

const API = 'https://reqres.in/api/users?page=2';
const DEFAULT_QUERY = 'redux';

class UserSelector extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],  //objects from api
          isLoading: false,
          error:null,
        };
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
        .then(json => this.setState({
          data: json.data,  
          isLoading:false
        }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {
        const { data, isLoading, error } = this.state;
        if(error){
          return <option>{error.message}</option>;
        }
        if (isLoading) {
          return <option>Loading ...</option>;
        }
        return (
            data.map(data =>
               <option key={data.id}>
                 {data.first_name}
                 {data.last_name}
                 </option>
            )
        );
    }
}
export default UserSelector;