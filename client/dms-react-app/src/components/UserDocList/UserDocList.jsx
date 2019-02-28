import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './UserDocList.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import {TextEditor} from '../textEditor/index';
import ModalHeader from '../ModalHeader/ModalHeader';


class UserDocList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userDocuments:[{}],
            userDocument: [{
                id:"",
                name:"",
                surname:"",
                template:"",
                condition:"",
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
                  <a href="#" onClick={ handleClick }>{ page }</a>
                </li>
            );
        };

        const options = {
            pageButtonRenderer
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            bgColor: "#edeeeebe",
            headerStyle: bgcolor,
            // onSelect: (row, isSelect, rowIndex, e) => {
            //     if (this.state.document.condition !== "saved") {
            //         return false;
            //     }
            // }
        };
                
        const userDocuments = [{
            id: 1,
            name: "Ana",
            template: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 2,
            name: "Marius",
            template: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: 3,
            name: "Birutė",
            template: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: 4,
            name: "Šarūnas",
            template: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 5,
            name: "Dalia",
            template: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: 6,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 7,
            name: "Ana",
            template: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 8,
            name: "Marius",
            template: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: 9,
            name: "Birutė",
            template: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: 10,
            name: "Šarūnas",
            template: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 11,
            name: "Dalia",
            template: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: 12,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 13,
            name: "Ana",
            template: "opa",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 14,
            name: "Marius",
            template: "opka",
            condition: "very alive",
            actions: "do nothing",
        }, {
            id: 15,
            name: "Birutė",
            template: "opapa",
            condition: "not dead",
            actions: "do nothing",
        }, {
            id: 16,
            name: "Šarūnas",
            template: "opka",
            condition: "dead",
            actions: "do nothing",
        }, {
            id: 17,
            name: "Dalia",
            template: "opka",
            condition: "good kido",
            actions: "do nothing",
        }, {
            id: 18,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 19,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 20,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 21,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 22,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 23,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 24,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }, {
            id: 25,
            name: "Marius",
            template: "opka",
            condition: "not very alive",
            actions: "do nothing",
        }];
       
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
        }]; 

        const customStyles = {
            content : {
              top          : '47%',
              left         : '50%',
              right        : 'auto',
              bottom       : 'auto',
              height       : '82%',
              width        : '80%',
              marginRight  : '-50%',
              transform    : 'translate(-50%, -50%)'
            }
        };

        return (
            <div className="UserDocList">
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.userDocuments }
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
                                <Button variant="secondary" type="submit" onClick={() => {this.openModal()}}>
                                    Peržiūrėti
                                </Button>
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
                            <Modal id='modal'
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Dokumento peržiūra"
                                >  
                                <ModalHeader modalIsOpen = {this.closeModal}/>                                            
                                <TextEditor className="textEditor"/>                      
                            </Modal>                          
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

    openModal = () => {
        this.setState({modalIsOpen: true});
    }
    
    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
     
    //Rodyti trinti ir pateikti reikia užčekboxintus dokumentus!!!!
    showDoc =() =>{

    };

    sendDoc =() =>{

    };
    
    deleteDoc =() =>{

    };
    //konkretaus usero dokumentai!!!
    componentDidMount(){
        this. fetchDataDocListUser()
    }

    fetchDataDocListUser = async (url) => {
        const res = await fetch("http://localhost:8086/document/user/" + this.props.user.id, {
          
          method: "GET",
          headers: {
            "content-type": "Application/json",
        },
        });
        const json = await res.json();      
        this.setState({ 
            userDocuments: json
        });             
        return json;
      }
}

export default withRouter(UserDocList);