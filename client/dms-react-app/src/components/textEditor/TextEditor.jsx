import React, { Component } from 'react';
import { Editor}  from 'slate-react';
import { Value } from 'slate';

import { FormatToolbar, Icon} from './index';

import  './TextEditor.css';
// this is where aditional plugins will lay
const plugins = [
  ]
//define the default node type
const DEFAULT_NODE = 'paragraph'

const existingValue = JSON.parse(localStorage.getItem('content'));
// editors data storage
const initialValue = Value.fromJSON(
    //existingValue ||
    {
    document:{
        nodes:[
            {
                object:'block',
                type:'paragraph',
                nodes:[
                    {
                        object:'text',
                        leaves: [
                            {
                                text:'',
                            }
                        ],
                    },
                ],
            },
        ],
    },
})

export default class TextEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: initialValue,
            //value2 : existingValue,
        }
    }

    componentDidMount(){
        localStorage.clear();
    }

    onNewVal = async () =>{
        console.log("In editor new value: " + this.props.newEditorVar);
        let newVal 
        if(typeof this.props.newEditorVar === 'undefined'){return}
        //if(JSON.stringify(newVal) !== '{}'){
            try{
                newVal= JSON.parse(this.props.newEditorVar);
            }catch(err){console.log(err)};
            // let deserializedVal
            //create value from json object
           const deserializedVal = Value.fromJSON(newVal || 
            {
                document:{
                    nodes:[
                        {
                            object:'block',
                            type:'paragraph',
                            nodes:[
                                {
                                    object:'text',
                                    leaves: [
                                        {
                                            text:'',
                                        }
                                    ],
                                },
                            ],
                        },
                    ],
                },
            })
            
            if(typeof newVal == "undefined"){
                console.log("NULL")
            }else{
                console.log("This is what i get: " + deserializedVal /*+ " This is what it should look like: " + this.state.value*/)

                   await this.setState({"value":deserializedVal})
            }
      //  }
    }
    //On change, update the app react state with new editor value
    onChange = ({value}) => {
        
        /* save the value to session storage ( for now.. )
        need compare or something to have it work with load    */
        if(value.document !== this.state.value.document){
            const content = JSON.stringify(value.toJSON());
            localStorage.setItem('content', content);
        }
       /* if(newVal !== null){
            this.setState({newVal})
            initialValue=newVal;
        }*/
        this.setState({ "value":value })
    }
    // reference to editor
    ref = editor => {
        this.editor = editor
    }
    //check if current selection has a mark with 'type' in it
    hasMark = type => {
        const{ value } = this.state
        return value.activeMarks.some( mark=>mark.type ===type);
    }
    //checks if currently selected blocks are of 'type'
    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type ===type);
    }
    // ctrl + 'key' for basic functions
    onKeyDown = (e,editor,next) =>{
        if(!e.ctrlKey){ return next();}
        switch (e.key){
           case 'b':{
                e.preventDefault();
                editor.toggleMark('bold');
                return true;
            }
            case 'i':{
                e.preventDefault();
                editor.toggleMark('italic')
                return true;
            }
            case 'l':{
                e.preventDefault();
                editor.toggleMark('list')
                return true;
            }
            case 'u':{
                e.preventDefault();
                editor.toggleMark('underline')
                return true;
            }
            default:{
                return next();
            }
        }
    };

    onClickMark = (e, type) => {
        // handle toolbar icon click
        e.preventDefault();
        this.editor.toggleMark(type);
    };

    onClickBlock = (event, type) => {
        // handle toolbar icon click
        event.preventDefault();

        const {editor} = this;
        const {value} = editor;
        const {document} = value;
        console.log(this.state.value2);
        //handle everything but list buttons
        if(type !== 'bulleted-list' && type !== 'numbered-list'){
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if(isList){
                editor
                .setBlocks(isActive ? DEFAULT_NODE : type)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
            }else{
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        }else{
            // handle extra wrapping required for list buttons
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if(isList && isType){
                editor
                .setBlocks(DEFAULT_NODE)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
            }else if (isList){
                editor.unwrapBlock(
                    type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                )
                .wrapBlock(type)
            }else{
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }
    }
    //send json to api
    handleSubmit = async (event, existingValue) =>{
        event.preventDefault();
        const data = existingValue;
        const API = 'http://localhost:8086/document/add';
        fetch(API, {
          method: 'POST',
          headers: {
              "content-type": "Application/json" 
          },
          body: JSON.stringify({document: data}),
        }).then(response => {
          console.log(response.status);
          if(response.status === 201){
            console.log(response.status);
          }
          else{
            console.log(response.status);
          }
        }).catch(error => console.error(error));
      }
// render Slate mark
    renderMark = (props, editor, next) => {

        const {children, mark, attributes} = props;

        switch (mark.type) {
            case 'bold':
              return <strong {...attributes}>{children}</strong>
            case 'code':
              return <code {...attributes}>{children}</code>
            case 'italic':
              return <em {...attributes}>{children}</em>
            case 'underlined':
              return <u {...attributes}>{children}</u>
            default:
              return next()
          }
    }
//render mark toggling toolbar button
    renderMarkButton = (type, icon) => {
            let isActive = this.hasMark(type);

            return(
                <button
                    active = { isActive.toString() }
                    onPointerDown= { event => this.onClickMark(event,type)}
                    >
                   <Icon>{icon}</Icon>
                    </button>
            )
    }

//render a block-toggling toolbar button

    renderBlockButton = (type, icon) =>{
        let isActive = this.hasBlock(type)

        if(['numbered-list','bulleted-list'].includes(type)){
            const { value: {document, blocks } } = this.state;

        if(blocks.size>0 ){
            const parent = document.getParent(blocks.first().key)
            isActive = this.hasBlock('list-item') && parent && parent.type === type
        }
    }

        return(
            <button
            active={isActive}
            onPointerDown={event => this.onClickBlock(event,type)}
            >
            <Icon>{icon}</Icon>
            </button>
        )
    }

    // render slate node

    renderNode = (props, editor, next) =>{
        const {attributes, children, node} = props;
        switch (node.type){
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes} >{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            default:
                return next()
        }
    }
    render(){
        return (
            <div className="textEditor">
            <React.Fragment>
                <FormatToolbar>
                    {this.renderMarkButton('bold', 'format_bold')}
                    {this.renderMarkButton('italic', 'format_italic')}
                    {this.renderMarkButton('underlined', 'format_underlined')}
                    {/*this.renderMarkButton('code', 'code')*/}
                    {this.renderBlockButton('heading-one', 'looks_one')}
                    {this.renderBlockButton('heading-two', 'looks_two')}
                    {/*this.renderBlockButton('block-quote', 'format_quote')*/}
                    {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                    {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
                    {/*<button className="save-document"variant='light' onPointerDown={event => this.handleSubmit(event, existingValue)}>
                    <Icon>{'save'}</Icon>
        </button>*/}
                </FormatToolbar>
            <Editor
            ref={this.ref}
            plugins={plugins} // implement plugins later
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={this.renderMark}
            renderNode={this.renderNode}
            readOnly={false}
            />
            </React.Fragment>
            </div>
        )
    }
}
