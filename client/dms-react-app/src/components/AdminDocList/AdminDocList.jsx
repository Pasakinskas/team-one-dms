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
            selectedDocuments:[],
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
                  <p onClick={ handleClick }>{ page }</p>
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
        console.log(this.state.documents)
        return (
            <div className="AdminDocList">
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.documents }                
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
                                <Button variant="danger" type="submit" onClick={(e) => { this.deleteDoc(e) }}>
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
                                autoFocus={false}
                                >  
                                <ModalHeader modalIsOpen = {this.closeModal} />                                            
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

    openModal = async() => {
        await this.setState({modalIsOpen: true});
        await this.showDoc();   
    }
      
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    changeSelectStatus = (row, isSelected, e)=>{
        // const newDoc = this.state.userDocuments.map(datarow => {
        //     if(datarow.id === row){
        //         datarow.isChecked = !datarow.isChecked;
        //     }
        // return row;
        // })
        if(isSelected){
            window.setTimeout(
                function() {
                    this.setState({
                    selectedDocuments: row
                });
                console.log("šiuo metu state " );
                console.log(this.state.selectedDocuments);
                    }.bind(this),
                0
            );
            console.log("Spausdinu pažymėtą");
            console.log(row);           
        }
    }

    // changeDocByCondition = (newCondition) => {
    //     let selectedDocuments = this.state.documents.map(doc =>{
    //        if(doc.isChecked){
    //          return doc
    //        } 
    //        return selectedDocuments;
    //     });
    //     for (let doc of selectedDocuments) {
    //         doc.condition = newCondition;
    //     }
    //     return selectedDocuments;
    // }

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
            console.log(json.content);
        // text :value for editor to consume
            this.setState({ 
                text: json.content,
        });      
    };

    //Document condition changes from rejected to submited
    letResubmitDoc =(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const resubmitDoc = this.state.selectedDocuments;
        const API = `http://localhost:8086/status/put/change?docId=${resubmitDoc.id}&statusId=2&description=''`;
        fetch(API, {
            method: 'PUT',
            headers: {
                'token': token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({resubmitDoc}),
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
        const token = localStorage.getItem("token");
        const deleteDoc = this.state.selectedDocuments;
        const API = `http://localhost:8086/status/put/change?docId=${deleteDoc.id}&statusId=5&description=''`;
        fetch(API, {
            method: 'PUT',
            headers: {
                'token': token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({deleteDoc}),
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

    fetchDataDocList = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
        const res = await fetch("http://localhost:8086/document/get/all", 
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
        console.log(JSON.stringify(json))
        this.setState({ 
            documents: json
        });
        return json;
    }
}

export default withRouter(AdminDocList);