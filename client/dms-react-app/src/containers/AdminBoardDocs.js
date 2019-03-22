import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';
import Footer from '../components/Footer/Footer';
import AdminDocList from '../components/AdminDocList/AdminDocList';

class AdminBoardDocs extends Component {
    constructor(props) {
        super(props);
        this.state = {         
        }
    }

    render() {
        return (
            <div>
                <AdminNavBar/> 
                <p className="headers">DOKUMENTAI</p>
                <AdminDocList token = {this.props.token}/>
                <Footer/>  
            </div>
        );
    }
}

export default AdminBoardDocs;