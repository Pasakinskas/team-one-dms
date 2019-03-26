import React, { Component } from 'react';
import NewDocForm from './NewDocForm';
import TextEditor from '../textEditor/TextEditor';

export default class NewDocumentJSX extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorValue:JSON,
            newEditorVar:JSON,
        }

        this.editor = React.createRef();
    }

    //set new editor value and call children method to accept it
    updateEditorValue = async (newEditorVal) => {
        await this.setState({"newEditorVar":newEditorVal})
        await console.log("Calling child from newDocument.js")
        await this.editor.current.onNewVal();
         
     }

     nextPath = (path)=>{
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <TextEditor className="EditorInForm" ref={this.editor} newEditorVar={this.state.newEditorVar} updateEditorValue={this.updateEditorValue}/>
                <NewDocForm className="FormInPage" token = { this.props.token } newEditorVar={this.state.newEditorVar} updateEditorValue={this.updateEditorValue}/>
            </div>
        );
    }
}