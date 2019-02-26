import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './AdminDocList.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button, Row } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';


class AdminDocList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            document: [{
                id: 1,
                name: "Ana",
                surname: "Kaka",
                template: "opa",
                condition: "dead",
                isChecked: false,
            }, {
                id: 2,
                name: "Marius",
                surname: "Kaka",
                template: "opka",
                condition: "very alive",
                actions: "do nothing",
                isChecked: false,
            }, {
                id: 3,
                name: "Birutė",
                surname: "Kaka",
                template: "opapa",
                condition: "not dead",
                isChecked: false,
            }, {
                id: 4,
                name: "Šarūnas",
                surname: "Kaka",
                template: "opka",
                condition: "dead",
                actions: "do nothing",
                isChecked: false,
            }, {
                id: 5,
                name: "Dalia",
                surname: "Kaka",
                template: "opka",
                condition: "good kido",
                isChecked: false,
            }, {
                id: 6,
                name: "Marius",
                surname: "Kaka",
                template: "opka",
                condition: "not very alive",
                isChecked: false,
            },{
                id: 7,
                name: "Ana",
                surname: "Kaka",
                template: "opa",
                condition: "dead",
                isChecked: false,
            }, {
                id: 8,
                name: "Marius",
                surname: "Kakaliukas",
                template: "opka",
                condition: "very alive",
                isChecked: false,
            }, {
                id: 9,
                name: "Birutė",
                surname: "Kakaliukas",
                template: "opapa",
                condition: "not dead",
                isChecked: false,
            }, {
                id: 10,
                name: "Šarūnas",
                surname: "Kakaliukas",
                template: "opka",
                condition: "dead",
                isChecked: true,
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
                console.log("row: " + row);
                console.log("IsSelect: " + isSelect);
                console.log("rowIndex: " + rowIndex);
                console.log(e);

            },    
        };

        const columns = [{
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
            dataField: 'template',
            text: 'Šablonas',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'condition',
            text: 'Būsena',
            sort: true,
            headerStyle: bgcolor,
            // formatter: cell => selectOptions[cell],
            // filter: selectFilter({
            //     options: selectOptions
            // })
        }]; 

        return (
            <div className="AdminDocList">
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.document }
                    columns={ columns }
                    search
                    >
                    {
                        props => (
                        <div className="tableElem">                      
                            <SearchBar
                                { ...props.searchProps } 
                                placeholder='Paieška...' />
                            <span id="btn">
                                <Button variant="danger" type="submit" onClick={() =>this.deleteDoc()}>
                                    Pašalinti
                                </Button>
                            <Link to="/newdoc" target="_blank" >
                                <Button variant="secondary" type="submit" onClick={() =>this.showDoc()}>
                                    Peržiūrėti
                                </Button>
                            </Link> 
                                <Button variant="success" type="submit" onClick={() =>this.send()}>
                                    Pateikti
                                </Button>
                            </span>
                            <BootstrapTable 
                                { ...props.baseProps }
                                filter={ filterFactory()}
                                pagination = { paginationFactory(options) }
                                selectRow={ selectRow }    
                            />                          
                        </div>
                        )                    
                    }
                </ToolkitProvider>
            </div>
        );
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }

    changeSelectStatus = (rowIndex)=>{
       const newDoc = this.state.document.map(row => {
           if(row.id -1 === rowIndex){
               console.log(rowIndex)
           row.isChecked = !row.isChecked;
           }
           return row;
       })
        this.setState({
            document: newDoc
        })
    }

    //Rodyti trinti ir pateikti reikia užchekboxintus dokumentus!!!!
    showDoc =() => {
        const localDoc = this.state.document;
        for(const row of localDoc){
            if (row.isChecked === true){
                this.nextPath(`/newdoc`) 
                //&& {/* row.text show in editor */}
            }
        }
    };

    sendDoc =(e) => {
        //kvieti dar vieną f-ją kuri pachina pateikto dok būseną?
        e.preventDefault();
        const text = this.document.text;
        const API = 'localhost:8080/document/add';
        fetch(API, {
            method: 'POST',
            body: JSON.stringify({document: text}),
        }).then(response => {
            if(response.status === 201){
                this.nextPath(`/adminboarddocs`);
            }else{
                alert("Pateikti nepavyko");
            }
        }).catch(error => console.error(error));
    };
    
    deleteDoc =(e) => {
        //kvieti dar vieną f-ją kuri pachina pateikto dok būseną?
        e.preventDefault();
        const text = this.document.text;
        const API = 'localhost:8080/document/add';
        fetch(API, {
            method: 'POST',
            body: JSON.stringify({document: text}),
        }).then(response => {
            if(response.status === 201){
                //do not show document in the list;
            }else{
                alert("Pašalinti nepavyko");
            }
        }).catch(error => console.error(error));
    };
    
    fetchDataDocList = async (url) => {
        const res = await fetch("http://localhost:8086/document/get/all", {
          
          method: "GET",
          headers: {
            "content-type": "Application/json",
        },
        });
        const json = await res.json();
        return json;
    }
}

export default withRouter(AdminDocList);