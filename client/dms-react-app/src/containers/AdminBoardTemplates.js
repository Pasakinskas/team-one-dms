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
                <p>ŠABLONAI</p>
                <TextEditor/>
                <NewDocFormAdmin/>
                <Footer/> 
            </div>
        );
    } 
}

export default AdminBoardTemplates;