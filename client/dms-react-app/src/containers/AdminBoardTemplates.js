import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';
import { TextEditor } from '../components/textEditor';
import NewDocFormAdmin from '../components/NewDocForm/NewDocFormAdmin';
import DocumentManager from '../components/documentTypesUI/documentManager';
class AdminBoardTemplates extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <DocumentManager/>
                <Footer/> 
            </div>
        );
    } 
}

export default AdminBoardTemplates;