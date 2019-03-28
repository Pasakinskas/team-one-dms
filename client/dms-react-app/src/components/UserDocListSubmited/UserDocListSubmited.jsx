import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '../UserDocList/UserDocList.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import {TextEditor} from '../textEditor/index';
import ModalHeaderSubmited from '../ModalHeader/ModalHeaderSubmited';

class UserDocListSubmited extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userDocuments:[],
            selectedDocuments: {},
            modalIsOpen: false,
            text:[]
        }
    } 

    render() {
        const {text} = this.state;
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
            mode: 'radio',
            clickToSelect: true,
            bgColor: "#edeeeebe",
            headerStyle: bgcolor,
            onSelect: this.changeSelectStatus
        };                
     
        const columns = [
        {
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
            dataField: 'owner',
            text: 'Siuntėjas',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'receiver',
            text: 'Gavėjas',
            sort: true,
            align: "center",
        }, {
            dataField: 'docName',
            text: 'Dokumentas',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'status',
            text: 'Būsena',
            sort: true,
            headerStyle: bgcolor,
        }, {
            dataField: 'details',
            text: 'Pastabos',
            sort: true,
            headerStyle: bgcolor,
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
              <div className="toolkit">
                <ToolkitProvider
                    keyField="id"
                    data= { this.state.userDocuments }
                    columns= { columns }
                    search
                    >
                    {
                    props => (
                        <div className="tableElem">
                            <SearchBar id="searchBar"
                                { ...props.searchProps } 
                                placeholder='Paieška...' />                                             
                            <Button id="btn" variant="secondary" type="submit" onClick={() => {this.openModal()}}>
                                Peržiūrėti
                            </Button>
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
                                autoFocus={false}
                                >  
                                <ModalHeaderSubmited modalIsOpen = {this.closeModal}/>                                          
                                <TextEditor newEditorVar={text}/>                  
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

    openModal = async () => {
        await this.setState({modalIsOpen: true});
        await this.showDoc();   
    }
     
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    changeSelectStatus = (row, isSelected, e)=>{
        if(isSelected){
            window.setTimeout(
                function() {
                    this.setState({
                    selectedDocuments: row
                });
                    }.bind(this),
                0
            );        
        }
    }

    //Rodyti trinti ir pateikti reikia užchekboxintus dokumentus!!!!
    showDoc = async () => {
        let token = localStorage.getItem('token');
        const selectedDoc = this.state.selectedDocuments;
        const API =`http://localhost:8086/document/get/byId?id=${selectedDoc.id}`;
        const res = await fetch(API, {
            method: "GET",
            headers: {
                'token': token,
                "content-type": "application/json"
            },
        })           
            const json = await res.json(); 
        // text :value for editor to consume
            this.setState({ 
                text: json.content,
        });      
    };

    componentDidMount(){
        this.fetchDataDocListUser()
    }

    fetchDataDocListUser = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8086/document/get/submited", 
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
            userDocuments: json
        });             
    }
}
  
  export default withRouter(UserDocListSubmited);