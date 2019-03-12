import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import GroupManagerData from './GroupManagerData';
import AddGroup from './AddGroup';

import './GroupManager.css'


export default class GroupManager extends Component{
    render(){
        return(
        <div className="groups-table">
            <AddGroup className="groups-add"/>
            <Table striped bordered hover>
            <tbody>
              <GroupManagerData/>
            </tbody>
            </Table>
        </div>
        )
    }
}