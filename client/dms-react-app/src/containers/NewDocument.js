import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader';
import Footer from '../components/Footer';
import NewDocForm from '../components/NewDocForm';
import { TextEditor } from '../components/textEditor';

class NewDocument extends Component {
    render() {
        return (
            <div>
                <TextEditor/>
               <NewDocHeader/>
               <NewDocForm/>
               <Footer/>
            </div>
        );
    }
}

export default NewDocument;