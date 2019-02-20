import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './UserDocList.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button } from 'react-bootstrap';


class UserDocList extends Component {
      
    render() {
        const { SearchBar } = Search;

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
                  <a href="#" onClick={ handleClick }>{ page }</a>
                </li>
            );
        };

        const options = {
            pageButtonRenderer
        };
                
        const documents = [{
            id: 1,
            name: "Ana",
            shablon: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 2,
            name: "Marius",
            shablon: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: 3,
            name: "Birutė",
            shablon: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: 4,
            name: "Šarūnas",
            shablon: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 5,
            name: "Dalia",
            shablon: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: 6,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        },{
            id: 7,
            name: "Ana",
            shablon: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 8,
            name: "Marius",
            shablon: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: 9,
            name: "Birutė",
            shablon: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: 10,
            name: "Šarūnas",
            shablon: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 11,
            name: "Dalia",
            shablon: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: 12,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 13,
            name: "Ana",
            shablon: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 14,
            name: "Marius",
            shablon: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: 15,
            name: "Birutė",
            shablon: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: 16,
            name: "Šarūnas",
            shablon: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 17,
            name: "Dalia",
            shablon: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: 18,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 19,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 20,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 21,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 22,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 23,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 24,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 25,
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }];
        
        const bgcolor = {backgroundColor: "#9ef7e8"};

        const idStyle = {width: 60, backgroundColor: "#9ef7e8"};

        const columns = [{
            dataField: 'id',
            text: 'Nr.',
            sort: true,
            headerStyle: idStyle,
            align: "center",
        }, {
            dataField: 'name',
            text: 'Pateikėjas',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'shablon',
            text: 'Šablonas',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'condition',
            text: 'Būsena',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'actions',
            text: 'Veiksmai',
            headerStyle: bgcolor,
        }]; 

        return (
            <div className="UserDocList">
                <ToolkitProvider
                    keyField="id"
                    data={ documents }
                    columns={ columns }
                    search
                    >
                    {
                        props => (
                        <div>
                            <SearchBar className='searchBar' { ...props.searchProps } placeholder='Paieška...' />
                            <BootstrapTable
                            { ...props.baseProps }
                            filter={ filterFactory()}
                            pagination = { paginationFactory(options) }    
                            />
                        </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }

    
    fetchDataDocList = async (url) => {
        const res = await fetch("http://localhost:8086", {
          
          method: "GET",
          headers: {
            "content-type": "Application/json",
        },
        });
        const json = await res.json();
        return json;
      }
}

export default UserDocList;