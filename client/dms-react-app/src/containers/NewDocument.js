import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader/NewDocHeader';
import Footer from '../components/Footer/Footer';
import NewDocForm from '../components/NewDocForm/NewDocForm';
import { TextEditor } from '../components/textEditor';

class NewDocument extends Component {
    render() {
        return (
            <div>
                <NewDocHeader/>
                <TextEditor/>
                <NewDocForm/>
                <Footer/>
            </div>
        );
    }
}

export default NewDocument;