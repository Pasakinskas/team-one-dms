import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import GroupManagerData from './GroupManagerData';
import AddGroup from './AddGroup';

import './GroupManager.css'


export default class GroupManager extends Component{
    constructor(props){
        super(props);
        this.groupManagerData = React.createRef();
    }
    componentRender = () =>{
        console.log('Vaikas iskviete mane - Teva')
        this.groupManagerData.current.componentRender();
    }
    render(){
        return(
        <div className="groups-table">
            <AddGroup className="groups-add" componentRender={this.componentRender}/>
            <Table striped bordered hover>
            <tbody>
              <GroupManagerData ref={this.groupManagerData}/>
            </tbody>
            </Table>
        </div>
        )
    }
}