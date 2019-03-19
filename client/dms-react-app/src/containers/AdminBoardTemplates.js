import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';
import { TextEditor } from '../components/textEditor';
import NewDocFormAdmin from '../components/NewDocForm/NewDocFormAdmin';

class AdminBoardTemplates extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <p className="headers">ŠABLONAI</p>
                <TextEditor className="tempElements"/>
                <NewDocFormAdmin className="tempElements"/>
                <Footer/> 
            </div>
        );
    } 
}

export default AdminBoardTemplates;