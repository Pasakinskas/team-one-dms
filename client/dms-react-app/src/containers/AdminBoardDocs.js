import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';
import AdminDocList from '../components/AdminDocList/AdminDocList';

class AdminBoardDocs extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <AdminDocList/>
                <Footer/>  
            </div>
        );
    }
}

export default AdminBoardDocs;