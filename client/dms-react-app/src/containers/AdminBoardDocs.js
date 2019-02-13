import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import Pagening from '../components/Pagening';
import Footer from '../components/Footer';

class AdminBoardDocs extends Component {
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

export default AdminBoardDocs;