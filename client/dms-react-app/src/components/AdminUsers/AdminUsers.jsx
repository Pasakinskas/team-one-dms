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
            users: [{}],
            user:[
            {
                id: 1,
                name: "Ana",
                surname: "Taurienė",
                position: "Laisvo oro dir.",
            }, {
                id: 2,
                name: "Dalia",
                surname: "Krunglevičiūtė",
                position: "Super Frontenderė",
            }, {
                id: 3,
                name: "Marius",
                surname: "Pašakinskas",
                position: "Super mega full stackeris"
            }, {
                id: 4,
                name: "Jonas",
                surname: "Kažkuris",
                position: "eilinis"
            }, {
                id: 5,
                name: "Petras",
                surname: "Anasten",
                position: "eilinis"
            }, {
                id: 6,
                name: "Mykolas",
                surname: "Pavardenis",
                position: "eilinis"
            }, {
                id: 7,
                name: "Ana",
                surname: "Taurienė",
                position: "Laisvo oro dir.",
            }, {
                id: 8,
                name: "Dalia",
                surname: "Krunglevičiūtė",
                position: "Super Frontenderė",
            }, {
                id: 9,
                name: "Marius",
                surname: "Pašakinskas",
                position: "Super mega full stackeris"
            }, {
                id: 10,
                name: "Jonas",
                surname: "Kažkuris",
                position: "eilinis"
            }, {
                id: 11,
                name: "Petras",
                surname: "Anasten",
                position: "eilinis"
            }, {
                id: 12,
                name: "Mykolas",
                surname: "Pavardenis",
                position: "eilinis"
            }]
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
            mode: 'checkbox',
            clickToSelect: true,
            headerStyle: bgcolor,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.changeSelectStatus(rowIndex);  
            }, 
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
                        <Button id="btn" variant="danger" type="submit" onClick={() =>this.deleteUser()}>
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

    changeSelectStatus = (rowIndex)=>{
        const newUsers = this.state.documents.map(row => {
            if(row.id -1 === rowIndex){
                 console.log(rowIndex)
                 row.isChecked = !row.isChecked;
            }
            return row;
        })
        this.setState({
            users: newUsers
        })
    }

    selectedUsers = () => {
        let selectedUsers= this.state.documents.map(doc =>{
           if(doc.isChecked){
             return doc
           } 
        });
        return selectedUsers;
    }

    deleteUser = (e) => {
        e.preventDefault();
        const deleteUserList = this.selectedUsers();
        const API = 'https://localhost:8086/document/add';
        fetch(API, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({deleteUserList}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath('/adminboarddocs')
            }else{
                alert("Pašalinti dokumento nepavyko");
            }
        }).catch(error => console.error(error));
    }; 

    componentDidMount(){
        this.fetchDataUserList()
    };

    fetchDataUserList = async (url) => {
        const res = await fetch("http://localhost:8086/users",
        {  
          method: "GET",
          headers: {
            "token": this.props.token,
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
        return json;
    };
}

export default withRouter(AdminUsers);