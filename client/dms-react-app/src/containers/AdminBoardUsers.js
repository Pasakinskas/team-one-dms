import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Pagening from '../components/Pagening/Pagening';
import Footer from '../components/Footer/Footer';

class AdminBoardUsers extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <Pagening/>
                <Footer/>
            </div>
        );
    }
}

export default AdminBoardUsers;