import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';
import GroupManager from '../components/groupManager/GroupManager';

class AdminBoardGroups extends Component {
    render() {
        return (
            <div>
                <AdminNavBar/> 
                <p className="headers">GRUPĖS</p>
                <GroupManager/>
                <Footer/> 
            </div>
        );
    }
}

export default AdminBoardGroups;