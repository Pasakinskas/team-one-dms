import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import AdminUsers from '../components/AdminUsers/AdminUsers';
import Footer from '../components/Footer/Footer';

class AdminBoardUsers extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <AdminUsers/>
                <Footer/>
            </div>
        );
    }
}

export default AdminBoardUsers;