import React, { Component } from 'react';
import TextEditor from '../textEditor/TextEditor';
import DocManagerForm from '../documentTypesUI/documentManagerForm';
import ViewTemplate from './ViewTemplates';

export default class DocumentManager extends Component{
    constructor(props){
        super(props);
        this.state={
            editorValue:JSON,
            newEditorVar:JSON,

        };
        this.editor = React.createRef();
        this.handler = this.handler.bind(this);
    }

//set new editor value and call children method to accept it
     updateEditorValue = async (newEditorVal) => {
       await this.setState({"newEditorVar":newEditorVal})
       await console.log("Calling child")
       await this.editor.current.onNewVal();
        
    }

    async handler(event, editorValue){
        //event.preventDefault();
        this.setState({
            "editorValue":editorValue
        })
        console.log("Editor value set");
        const json = JSON.stringify(this.state.editorValue)
        console.log(json);
    }

    nextPath = (path)=>{
        this.props.history.push(path);
    }

    render(){
        return(
            <div className="template-creator">
                <TextEditor ref={this.editor} newEditorVar={this.state.newEditorVar} updateEditorValue={this.updateEditorValue}/>
                <DocManagerForm editorValue={this.state.editorValue} />
                <ViewTemplate updateEditorValue={this.updateEditorValue} newEditorVar={this.state.newEditorVar}/>
            </div>
        )
    }
}