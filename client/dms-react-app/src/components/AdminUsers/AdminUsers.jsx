import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './AdminUsers.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class AdminUsers extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            selectedUser:[],
        } 
    }    


    render() {
        const { SearchBar } = Search;
        const bgcolor = {backgroundColor: "#9ef7e8"};
        const idStyle = {width: 60, backgroundColor: "#9ef7e8"};
        
        const pageButtonRenderer = ({
            page,
            active,
            disable,
            title,
            onPageChange
            }) => {
            const handleClick = (e) => {
                e.preventDefault();
                onPageChange(page);
            };
            return (
                <li className="page-item">
                  <a href="" onClick={ handleClick }>{ page }</a>
                </li>
            );
        };

        const options = {
            pageButtonRenderer
        };      
        
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            headerStyle: bgcolor,
            onSelect: this.changeSelectStatus,
        };

        const columns = [
        {
            dataField: 'id',
            text: 'Nr.',
            sort: true,
            headerStyle: idStyle,
            align: "center",
        }, {
            dataField: 'name',
            text: 'Vardas',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'surname',
            text: 'Pavardė',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'position',
            text: 'Pareigos',
            sort: true,
            headerStyle: bgcolor,
        }]; 

        return (
            <div className="AdminUsers">
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.users }
                    columns={ columns }
                    search
                    >
                    { props => (
                    <div className="tableElem">                      
                        <SearchBar
                            { ...props.searchProps } 
                            placeholder='Paieška...' />
                        <Button id="btn" variant="danger" type="submit" onClick={(e) =>this.deleteUser(e)}>
                            Pašalinti
                        </Button>
                        <BootstrapTable 
                            { ...props.baseProps }
                            filter={ filterFactory()}
                            pagination = { paginationFactory(options) }
                            selectRow={ selectRow }    
                        />                          
                    </div>
                    )}
                </ToolkitProvider>
            </div>
        );
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    };

    changeSelectStatus = (row, isSelected, e)=>{
        if(isSelected){
            window.setTimeout(
                function() {
                    this.setState({
                    selectedUser: row
                });
                    }.bind(this),
                0
            );          
        }
    }    

    // Delete selected user
    deleteUser = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const deleteUser = this.state.selectedUser;
        const API = `http://localhost:8086/users/${deleteUser.id}`;
        fetch(API, {
            method: 'DELETE',
            headers: {
                'token': token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({deleteUser}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath('/adminboarddocs')
            }else{
                alert("Pašalinti vartotojo nepavyko");
            }
        }).catch(error => console.error(error));
    }; 

    componentDidMount(){
        this.fetchDataUserList()
    };

    //Get All existing users
    fetchDataUserList = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8086/users",
        {  
          method: "GET",
          headers: {
            "token": token,
            "content-type": "application/json",
          },
        })
        if (res.status > 300) {
            alert("Fail")
        }
        const json = await res.json();
        this.setState({ 
            users: json
        });
    };
}

export default withRouter(AdminUsers);