import React, { Component } from 'react';
import NewDocHeaderAdmin from '../components/NewDocHeader/NewDocHeaderAdmin';
import Footer from '../components/Footer/Footer';
import DocumentManager from '../components/documentTypesUI/documentManager';

class NewTemplate extends Component {
    render() {
        return (
            <div>
                <NewDocHeaderAdmin/>
                <DocumentManager/>
                <Footer/>
            </div>
        );
    }
}

export default NewTemplate;