import React, { Component } from 'react';
import {Card, ListGroup, FormLabel} from 'react-bootstrap';
import './GroupView.css';


class GroupView extends Component {
    render() {
        return (
            <div className="group">
                <Card className="card">
                <FormLabel className="GroupLabel">Padalinia</FormLabel>
                <ListGroup variant="flush">
                    <li className="list-group-item">Administracija</li>
                    <li className="list-group-item">Personalo skyrius</li>
                    <li className="list-group-item">Buhalterija</li>
                    <li className="list-group-item">IT skyrius</li>
                </ListGroup>
                </Card>
            </div>
        );
    }
}

export default GroupView;