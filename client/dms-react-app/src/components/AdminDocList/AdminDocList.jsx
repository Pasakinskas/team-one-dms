import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './AdminDocList.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import {TextEditor} from '../textEditor/index';
import ModalHeader from '../ModalHeader/ModalHeader';


class AdminDocList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            documents: [],
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
            }, {
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
            }, {
                id: 11,
                name: "Dalia",
                surname: "Kaka",
                template: "opka",
                condition: "good kido",
                isChecked: false,
            }, {
                id: 12,
                name: "Marius",
                surname: "Kaka",
                template: "opka",
                condition: "not very alive",
                isChecked: false,
            }, {
                id: 13,
                name: "Ana",
                surname: "Kaka",
                template: "opa",
                condition: "dead",
                isChecked: false,
            }, {
                id: 14,
                name: "Marius",
                surname: "Kakaliukas",
                template: "opka",
                condition: "very alive",
                isChecked: false,
            }, {
                id: 15,
                name: "Birutė",
                surname: "Kakaliukas",
                template: "opapa",
                condition: "not dead",
                isChecked: false,
            }, {
                id: 16,
                name: "Šarūnas",
                surname: "Kakaliukas",
                template: "opka",
                condition: "dead",
                isChecked: true,
            }
        ],
            modalIsOpen: false,
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
                  <p onClick={ handleClick }>{ page }</p>
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
            onSelect: (row, isSelect, rowIndex, e) => {
                this.changeSelectStatus(rowIndex);
                console.log("row: " + row);
                console.log("IsSelect: " + isSelect);
                console.log("rowIndex: " + rowIndex);
                console.log(e);

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

        const customStyles = {
            content : {
                top: '47%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                height: '82%',
                width: '80%',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };

        return (
            <div className="AdminDocList">
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.document }
                    // { this.state.documents.filter((document)=>{return (document.status !== "saved") && (document.status !== "deleted")}) }                  
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
                                <Button variant="danger" type="submit" onClick={() => { this.deleteDoc() }}>
                                    Pašalinti
                                </Button>
                                <Button variant="secondary" type="submit" onClick={() => {this.openModal()}}>
                                    Peržiūrėti
                                </Button>
                                <Button className="repeat" variant="success" type="submit" onClick={() => { this.send() }}>
                                    Leisti pateikti pakartotinai
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
                                <ModalHeader modalIsOpen = {this.closeModal} />                                            
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
      
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    changeSelectStatus = (rowIndex)=>{
       const newDoc = this.state.documents.map(row => {
           if(row.id -1 === rowIndex){
                console.log(rowIndex)
                row.isChecked = !row.isChecked;
           }
           return row;
        })
        this.setState({
            documents: newDoc
        })
    }

    changeDocByCondition = (newCondition) => {
        let selectedDocuments = this.state.documents.map(doc =>{
           if(doc.isChecked){
             return doc
           } 
        });

        for (let doc of selectedDocuments) {
            doc.condition = newCondition;
        }
        return selectedDocuments;
    }

    //Rodyti trinti ir pateikti reikia užchekboxintus dokumentus!!!!
    showDoc = () => {
        const localDoc = this.state.document;
        for(const row of localDoc){
            if (row.isChecked === true){
                this.nextPath(`/newdoc`) 
                //&& {/* row.text show in editor */}
            }
        }
    };

    //Document condition changes from rejected to submited
    letResubmitDoc =(e) => {
        e.preventDefault();
        const resubmitDocList = this.changeDocByCondition("submitted");
        const API = 'https://localhost:8086/document/add';
        fetch(API, {
            method: 'PUT',
            headers: {
                'token': this.props.token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({resubmitDocList}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath(`/adminboarddocs`);
            }else{
                alert("Leisti pateikti pakartotinai nepavyko");
            }
        }).catch(error => console.error(error));
    };
    
    //Document condition changes to deleted
    deleteDoc = (e) => {
        e.preventDefault();
        const deleteDocList = this.changeDocByCondition("deleted");
        const API = 'https://localhost:8086/document/add';
        fetch(API, {
            method: 'DELETE',
            headers: {
                'token': this.props.token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({deleteDocList}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath('/adminboarddocs')
            }else{
                alert("Pašalinti dokumento nepavyko");
            }
        }).catch(error => console.error(error));
    };

    componentDidMount(){
        this.fetchDataDocList()
    }

    fetchDataDocList = async (url) => {
        const res = await fetch("http://localhost:8086/document/get/all", 
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
        console.log(json)
        this.setState({ 
            documents: json
        });
        return json;
    }
}

export default withRouter(AdminDocList);