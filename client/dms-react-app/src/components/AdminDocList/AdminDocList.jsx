import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, formatter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './AdminDocList.css';

class DocList extends Component {
  
    render() {

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
          
        const selectOptions = [
            { value: 0, label: 'dead' },
            { value: 1, label: 'very alive' },
            { value: 2, label: 'good kido' }
        ];
        
        const documents = [{
            id: "1",
            name: "Ana",
            shablon: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: "2",
            name: "Marius",
            shablon: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: "3",
            name: "Birutė",
            shablon: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: "4",
            name: "Šarūnas",
            shablon: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: "5",
            name: "Dalia",
            shablon: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: "6",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        },{
            id: "7",
            name: "Ana",
            shablon: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: "8",
            name: "Marius",
            shablon: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: "9",
            name: "Birutė",
            shablon: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: "10",
            name: "Šarūnas",
            shablon: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: "11",
            name: "Dalia",
            shablon: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: "12",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "13",
            name: "Ana",
            shablon: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: "14",
            name: "Marius",
            shablon: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: "15",
            name: "Birutė",
            shablon: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: "16",
            name: "Šarūnas",
            shablon: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: "17",
            name: "Dalia",
            shablon: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: "18",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "19",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "20",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "21",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "22",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "23",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "24",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: "25",
            name: "Marius",
            shablon: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }];

        const columns = [{
            dataField: 'id',
            text: 'Dokumento ID',
            sort: true,
        }, {
            dataField: 'name',
            text: 'Pateikėjas',
            sort: true,
            filter: textFilter(),
        }, {
            dataField: 'shablon',
            text: 'Šablonas',
            sort: true,
        }, {
            dataField: 'condition',
            text: 'Būsena',
            sort: true,
            //formatter: cell => selectOptions.find(opt => opt.value === cell).label,
            filter: selectFilter({
                options: selectOptions
            })
        }, {
            dataField: 'actions',
            text: 'Veiksmai'
            }]; 

        return (
            <div className="AdminDocList">
                <BootstrapTable keyField='id' 
                pagination={ paginationFactory(options) }
                data={ documents } 
                columns={ columns } 
                filter={ filterFactory()}               
                />
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

export default DocList;