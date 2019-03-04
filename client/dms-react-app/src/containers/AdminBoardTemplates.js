import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';
import { TextEditor } from '../components/textEditor';

class AdminBoardTemplates extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <TextEditor/>
                <Footer/> 
            </div>
        );
    } 
}

export default AdminBoardTemplates;