import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader/NewDocHeader';
import Footer from '../components/Footer/Footer';
import DocumentManager from '../components/documentTypesUI/documentManager';

class NewTemplate extends Component {
    render() {
        return (
            <div>
                <NewDocHeader/>
                <p className="headers">ŠABLONAI</p>
                <DocumentManager/>
                <Footer/>
            </div>
        );
    }
}

export default NewTemplate;