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
            userDocuments:[{
                id: 1,
                date: "2019.12.12",
                name: "Ana",
                surname: "Taurienė",
                recipient: "Good",
                template: "dead",
                condition: "lalala",
            }],
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
                  <a href="#" style={{color: "#2e2e2e"}} onClick={ handleClick }>{ page }</a>
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
            onSelect: (row, isSelect, rowIndex, e) => {this.changeSelectStatus()}
        };                
     
        const columns = [{
            dataField: 'id',
            text: 'Nr.',
            sort: true,
            headerStyle: idStyle,
            align: "center",
        }, {
            dataField: 'date',
            text: 'Data',
            sort: true,
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
            dataField: 'recipient',
            text: 'Gavėjas',
            sort: true,
            align: "center",
        },{
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
              top:'47%',
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
            <div className="toolkit">
                <ToolkitProvider
                    keyField="id"
                    data=  { this.state.userDocuments }
                    // { this.state.userDocuments.filter((document)=>{return document.status=="saved"}) }
                    columns= { columns }
                    search
                    >
                    {
                        props => (
                            <div className="tableElem">                      
                            <SearchBar 
                                { ...props.searchProps } 
                                placeholder='Paieška...' />
                            <span id="btn">
                                <Button variant="danger" type="submit" onClick={() => {this.deleteDoc()}}>
                                    Pašalinti
                                </Button>
                                <Button variant="secondary" type="submit" onClick={() => {this.openModal()}}>
                                    Peržiūrėti
                                </Button>
                                <Button variant="success" type="submit" onClick={() => {this.send()}}>
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
                                <TextEditor className="modalTextEditor"/>                      
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
        const newDoc = this.state.userDocument.map(row => {
            if(row.id -1 === rowIndex){
                 console.log(rowIndex)
                 row.isChecked = !row.isChecked;
            }
            return row;
         })
         this.setState({
             userDocuments: newDoc
         })
     }
 
     //Rodyti trinti ir pateikti reikia užchekboxintus dokumentus!!!!
    showDoc =() => {
        const localDoc = this.state.document;
        for(const row of localDoc){
            if (row.isChecked === true){
                //nusetinti teksto reikšmę ir atvaizduoti į editorių modaliniam lange.
            }
        }
    };
 
    sendDoc =(e) => {
        //kvieti dar vieną f-ją kuri patchina pateikto dok būseną?
        e.preventDefault();
        const text = this.document.text;
        const API = 'localhost:8086/document/add';
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
     
    deleteDoc = (e) => {
        e.preventDefault();
        const doc = this.state.userDocuments;
        const API = 'localhost:8086/document/add';
        fetch(API, {
            method: 'Patch',
            body: this.state.userDocuments,
        }).then(response => {
            if(response.status === 200){
                //change document status to deleted
            }else{
                alert("Pašalinti nepavyko");
            }
        }).catch(error => console.error(error));
    };
     
    //konkretaus usero dokumentai!!!
    componentDidMount(){
        this. fetchDataDocListUser()
    }

    fetchDataDocListUser = async (url) => {
        //this.props.user.id ateina iš app.js
        const res = await fetch("http://localhost:8086/document/user/all" 
        // + this.props.user.id
        , {
          
          method: "GET",
          headers: {
            //  tokken: 
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