import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader/NewDocHeader';
import Footer from '../components/Footer/Footer';
import DocumentManager from '../components/documentTypesUI/documentManager';
import AdminNavBar from '../components/AdminNavBar/AdminNavBar';

class NewTemplate extends Component {
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

export default NewTemplate;