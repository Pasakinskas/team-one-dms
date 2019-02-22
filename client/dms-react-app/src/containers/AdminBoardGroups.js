import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Pagening from '../components/Pagening/Pagening';
import Footer from '../components/Footer/Footer';
import AdminGroupManager from '../components/groupManager/AdminGroupManager';

class AdminBoardGroups extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <AdminGroupManager/>
                <Pagening/>
                <Footer/> 
            </div>
        );
    }
}

export default AdminBoardGroups;