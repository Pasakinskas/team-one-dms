import React, { Component } from 'react';

const API = 'http://localhost:8086/users';
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
        this.fetchAllUsers();
        

    }

    fetchAllUsers = async() =>{

      const token = localStorage.getItem('token');
      const res = await fetch( `http://localhost:8086/users`, {
          method: 'GET',
          headers: {
              'token':token,
              "content-type": "application/json"
          },
          })
      const json = await res.json();
      console.log(json);
      this.setState({isLoading: false , data : json});
  }

    render() {
        const { data, isLoading, error} = this.state;
        if(error){
          return <option>{error.message}</option>;
        }
        if (isLoading) {
          return <option>Loading ...</option>;
        }
        return (
            data.map(data =>
               <option 
               key={data.id}
                 value={data.id}
                 >
                 {data.name}
                 &nbsp;
                 {data.surname}
                 </option>
            )
        );
    }
}
export default UserSelector;