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

//255, 205,233 eil. API adresas - patikslinti
//showDoc = () => pabaigti
//document types: Saved(išsaugoti) - shown just to user,
//                Submited(pateikti) - shown tu user and users who can accept or reject
//                Accepted(priimti) - documents accepted by group or other users
//                Rejected(atmesti) - documents rejected by group or other users
//                Deleted(panaikinti) - can be deleted by user or admin only. After that don't shown in any list.

 
class UserDocList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userDocuments:[],
            selectedDocuments: [],
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

        const selectRow = 
        {
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
                    // { this.state.userDocuments.filter((document)=>{return document.condition == "saved"}) }
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
                                {/* editor = {userDocuments filter text}                   */}
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
        this.showDoc();
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
            selectedDocuments: newDoc
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
    
    showDoc =() => {
    const localDoc = this.state.userDocuments;
    for(const row of localDoc){
        if (row.isChecked === true){
            //nusetinti teksto reikšmę ir atvaizduoti į editorių modaliniam lange.
            }
        }
    };
  
    //Document condition changes to submited(pateikti dok.)
    sendDoc =(e) => {
        e.preventDefault();
        const sentDocList = this.changeDocByCondition("submited");
        const API = 'http://localhost:8086/document/';
         fetch(API, {
            method: 'PUT',
            headers: {
                'token': this.props.token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({sentDocList}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath(`/userboard`);
            }else{
                alert("Pateikti nepavyko");
            }
        }).catch(error => console.error(error));
    };

    //Document condition changes to deleted(Dokumentas pašalinamas, bet neištrinamas iš DB)
    deleteDoc = (e) => {
        e.preventDefault();
        const deleteDocList = this.changeDocByCondition("deleted");
        const API = 'http://localhost:8086/document/add';
          fetch(API, {
            method: 'DELETE',
            headers: {
                'token': this.props.token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({deleteDocList}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath(`/userboard`);
            }else{
                alert("Pateikti nepavyko");
            }
        }).catch(error => console.error(error));
    };
     
    componentDidMount(){
        this.fetchDataDocListUser()
    }

    //Gauna visus šio userio dokumentus, o returne (130) filtruoja pagal condition = 'saved'.
    fetchDataDocListUser = async () => {
        console.log("man reikia šito " + this.props.token)
        const res = await fetch("http://localhost:8086/getSaved/byUserId",
        // + this.props.user.id šito nereiki, nes už tai atsako tokenas.
        {
          method: "GET",
          headers: { 
            "token": this.props.token,
            "content-type": "application/json"
          },
        })
        console.log("man reikai šito " + this.props.token)
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

export default withRouter(UserDocList);