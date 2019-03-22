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
            userDocuments:[{}],
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
        }, {
            dataField: 'notes',
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
                    // { this.state.userDocuments.filter((document)=>{return (document.condition !=="saved") && (document.condition !== "Deleted")} ) }
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
                                >  
                                <ModalHeaderSubmited modalIsOpen = {this.closeModal}/>                                          
                                <TextEditor style={{"width" : "95%"}}/>                  
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
        const newDoc = this.state.userDocuments.map(row => {
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

    changeDocByCondition = (newCondition) => {
        let selectedDocuments = this.state.userDocuments.map(doc =>{
           if(doc.isChecked){
             return doc
           } 
           return selectedDocuments;
        });

        for (let doc of selectedDocuments) {
            doc.condition = newCondition;
        }
        return selectedDocuments;
    }

 
     //Rodyti trinti ir pateikti reikia užchekboxintus dokumentus!!!!
    showDoc =() => {
        const localDoc = this.state.userDocuments;
        for(const row of localDoc){
            if (row.isChecked === true){
                //nusetinti teksto reikšmę ir atvaizduoti į editorių modaliniam lange.
            }
        }
    };

    componentDidMount(){
        this.fetchDataDocListUser()
    }

    
    fetchDataDocListUser = async() => {
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
        return json;
    }
  
  }
  
  export default withRouter(UserDocListSubmited);