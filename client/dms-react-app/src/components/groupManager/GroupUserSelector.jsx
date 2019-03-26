import React, { Component } from 'react';

const API = 'http://localhost:8086/users';
const DEFAULT_QUERY = 'redux';

class GroupUserSelector extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],  //objects from api
          isLoading: false,
          error:null,
          members:this.props.groupMembersList,
        };
    }

    render() {
        const { data, isLoading, error,members} = this.state;
        return (
            members.map(data =>
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
export default GroupUserSelector;