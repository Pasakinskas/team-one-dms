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
import ModalHeaderGeted from '../ModalHeader/ModalHeaderGeted';


class UserDocListGeted extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userDocuments:[],
            selectedDocuments:[],
            modalIsOpen: false,
            rejectModalIsOpen: false,
            rejectReason:"",
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

        const documents = [{
            id: 1,
            date: 2019,
            owner: 'Ana',
            receiver: 'Kažkas',
            docName: "atostogos",
            status:'pateiktas',
            details: "",

        }];

        const selectRow = 
        {
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
                             <span id="btn">
                                <Button variant="danger" type="button" onClick={(e) => {this.rejectDoc(e)}}>
                                    Atmesti
                                </Button>
                                <Button variant="secondary" type="button" onClick={() => {this.openModal()}}>
                                    Peržiūrėti
                                </Button>
                                <Button variant="success" type="button" onClick={(e) => {this.acceptDoc(e)}}>
                                    Priimti
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
                                <ModalHeaderSubmited modalIsOpen = {this.closeModal}/>                                          
                                <TextEditor newEditorVar={text}/>                  
                            </Modal> 
                            <Modal 
                                isOpen={this.state.rejectModalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeRejectModal}
                                style={customStyles}
                                contentLabel="Atmetimo priežastis"
                                >  
                                <ModalHeaderGeted rejectModalIsOpen = {this.closeRejectModal}/> 
                                <textarea  name ="rejectReason"
                                            value ={ this.state.rejectReason }
                                onChange={this.handleChange} 
                                          style={{"marginTop": "40px", "marginLeft": "20px", 
                                                "width" : "95%", "height": "100px"}}></textarea> 
                                <button type="button" onClick={()=>{this.sendRejection()}}>Tvirtinti šalinimą</button>                 
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

    openRejectModal = () => {
        this.setState({rejectModalIsOpen: true});
    }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    closeRejectModal = () => {
        this.setState({rejectModalIsOpen: false});
    }

    changeSelectStatus = (row, isSelected, e)=>{
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

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
          [name]:value,       
        });
        console.log("Atmetimo priežastis " + this.state.rejectReason);
        console.log(this.state.rejectReason); 
    }

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
  
 
    //Document condition changes to accepted. After that isn't shown in geted document list
    acceptDoc =(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const acceptDoc = this.state.selectedDocuments;
        const API = `http://localhost:8086/status/post/change?docId=${acceptDoc.id}&statusId=3&description=''`;
        fetch(API, {
            method: 'PUT',
            headers: {
                'token': token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({acceptDoc}),
        }).then(response => {
            if(response.status === 200){
                this.nextPath(`/usergetdoc`);
            }else{
                alert("Patvirtinti dokumento nepavyko");
            }
        }).catch(error => console.error(error));
    };
    
    //Document condition changes to rejected. After that isn't shown in geted document list
    // make method for one document, not for list, and then loop the list and apply the method
    rejectDoc = (e) => {
        e.preventDefault();
        this.openRejectModal();  
    };

    sendRejection = () =>{
        const token = localStorage.getItem("token");
        // const rejectDocList = this.changeDocByConditiont("rejected");
        const rejectReason = this.state.rejectReason
        const rejectDoc = this.state.selectedDocuments;
        const API =  `http://localhost:8086/status/put/change?docId=${rejectDoc.id}&statusId=4&description=${rejectReason}`;
        fetch(API, {
            method: 'PUT',
            headers: {
                'token': token,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({rejectDoc}),
        }).then(response => {
            if(response.status === 200){
                alert("Dokumentas atmestas sėkmingai");
            }else{
                alert("Pašalinti nepavyko");
            }
        }).catch(error => console.error(error));
    }

    componentDidMount(){
        this.fetchDataDocListGeted()
    }

    //Gauna visus dokumentus, kuriuos jis tuiri teisę priimti ar atmesti. O returne (130) filtruoja pagal condition = 'submited'.
    fetchDataDocListGeted = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8086/document/get/geted", 
        {
          method: "GET",
          headers: {
            "token": token,
            "content-type": "application/json",
        },
        });
        if (res.status > 300) {
            alert("Fail")
        } 
        const json = await res.json();      
        this.setState({ 
            userDocuments: json
        });  
        console.log(JSON.stringify(json))
        return json;
    } 
}
  
export default withRouter(UserDocListGeted);