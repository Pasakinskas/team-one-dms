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
            text:[]
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
                                <Button variant="danger" type="submit" onClick={(e) => {this.deleteDoc(e)}}>
                                    Pašalinti
                                </Button>
                                <Button variant="secondary" type="submit" onClick={() => {this.openModal()}}>
                                    Peržiūrėti
                                </Button>
                                <Button variant="success" type="button" onClick={(e) => {this.sendDoc(e)}}>
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
                                <TextEditor className="modalTextEditor" newEditorVar={this.state.text}/>    
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
     
    changeSelectStatus = (row, isSelected, e)=>{
        const newDoc = this.state.userDocuments.map(datarow => {
            if(datarow.id -1 === row){
                datarow.isChecked = !datarow.isChecked;
            }
        return row;
        })
        if(isSelected){
            window.setTimeout(
                function() {
                    this.setState({
                    selectedDocuments: newDoc
                });
                    }.bind(this),
                0
            );
            console.log("Spausdinu pažymėtą");
            console.log(row);
            console.log("Pažymėtas dok. nusetintas į state " );
            console.log(this.state.selectedDocuments);
        }
    }

    changeDocByCondition = (newCondition) => {
        // let selectedDocuments = this.state.userDocuments.map(doc =>{
        //    if(doc.isChecked){
        //      return doc
        //    } 
        //    return selectedDocuments;
        // });
        for (let doc of this.state.selectedDocuments) {
            console.log(doc)
            doc.status = newCondition;
        }
        console.log("Dokumentai statuso keitimui ")
        console.log(JSON.stringify(this.state.selectedDocuments));
        return this.state.selectedDocuments;
    }
    
    showDoc =() => {
    const localDoc = this.state.userDocuments.id;
    for(const row of localDoc){
        if (row.isChecked === true){
            // fetchDataDocView = async () => {
            //     const res = await fetch(`http://localhost:8086/document/${localDoc}`,
            //     {
            //       method: "GET",
            //       headers: { 
            //         "content-type": "application/json"
            //       },
            //     })
            //     if (res.status > 300) {
            //         alert("Fail")
            //     }
            //     const json = await res.json(); 
            //     this.setState({ 
            //         text: json.doc.value
            //     });   
                          
            //     return json;
            //     }
            }
        }
    };
  
    //Document condition changes to submited(pateikti dok.)
    sendDoc =(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const sentDocList = this.changeDocByCondition("submited");
        const selectedDoc = this.state.selectedDocuments;
        selectedDoc.forEach((e)=>{
        const API = `http://localhost:8086/status/post/change?docId=${e.id}&statusId=2&description=''`;
         fetch(API, {
            method: 'POST',
            headers: {
                'token': token,
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
    });

    };

    //Document condition changes to deleted(Dokumentas pašalinamas, bet neištrinamas iš DB)
    deleteDoc = (e) => {
        const token = localStorage.getItem("token");
        const deleteDocList = this.changeDocByCondition("deleted");
        const selectedDoc = this.state.selectedDocuments;
        selectedDoc.forEach((e)=>{
        const API = `http://localhost:8086/status/post/change?docId=${e.id}&statusId=5&description=''`;
            fetch(API, {
                method: 'POST',
                headers: {
                    'token': token,
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
        });
    };
     
    componentDidMount(){
         this.fetchDataDocListUser()
    }

    //Gauna visus šio userio dokumentus, o returne (130) filtruoja pagal condition = 'saved'.
    fetchDataDocListUser = async () => {
        const token = localStorage.getItem("token");
        console.log(token)
        const res = await fetch("http://localhost:8086/document/get/saved",
        {
          method: "GET",
          headers: { 
            "token": token,
            "content-type": "application/json"
          },
        })
        if (res.status > 300) {
            alert("Fail")
        }
        console.log(res)
        const json = await res.json();      
        this.setState({ 
            userDocuments: json
        });       
        console.log(JSON.stringify(json))    
        return json;
    }
}

export default withRouter(UserDocList);