import React, { Component } from 'react';

const API_TEST = 'https://reqres.in/api/users?page=2';
const API ='http://localhost:8086/doctemplates/get/all';
const DEFAULT_QUERY = 'redux';

class TemplateSelector extends Component{
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
          this.fetchTemplates();
          
    }

    fetchTemplates = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(API, {
        method: 'GET',
        headers: {
          "token":token,
        },
        })
        const statusCode = await res.status;
        const json =  await res.json();
        console.log(json);
        this.setState({
            data:json,
        })
        this.setState({ isLoading: false });
        return statusCode;
    }
    render() {
        const { data, isLoading, error} = this.state;
        console.log(data);
        if(error){
          return <option>{error.message}</option>;
        }
        if (isLoading) {
          return <option>Loading ...</option>;
        }
        if(typeof data === 'undefined'){
          return(
            <option>Nothing to return</option>
          )
        }else{
          return (
            
            data.map(data =>
               <option 
                 key={data.id}
                 value={data.id}
                 >
                 {data.description}
                 </option>
            )
        
          );}
        
    }
}
export default TemplateSelector;