import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';


class AdminBoardTemplates extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <Footer/> 
            </div>
        );
    }
}

export default AdminBoardTemplates;