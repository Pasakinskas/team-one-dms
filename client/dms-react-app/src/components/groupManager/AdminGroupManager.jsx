import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import GroupManagerData from './GroupManagerData';
import AddGroup from './AddGroup';

import './AdminGroupManager.css'


export default class AdminGroupManager extends Component{

    render(){
        return(
        <div className="groups-table">
            <AddGroup/>
            <Table striped bordered hover>
            <tbody>
              <GroupManagerData/>
            </tbody>
            </Table>
        </div>
        )
    }
}