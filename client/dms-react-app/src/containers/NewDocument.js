import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader/NewDocHeader';
import Footer from '../components/Footer/Footer';
import NewDocForm from '../components/NewDocForm/NewDocForm';
import { TextEditor } from '../components/textEditor';

class NewDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <NewDocHeader/>
                <TextEditor className="EditorInForm" newEditorVar={this.props.newEditorVar}/>
                <NewDocForm className="FormInPage" token = { this.props.token }/>
                <Footer/>
            </div>
        );
    }
}

export default NewDocument;