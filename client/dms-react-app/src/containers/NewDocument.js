import React, { Component } from 'react';
import NewDocHeader from '../components/NewDocHeader';
import Footer from '../components/Footer';
import NewDocForm from '../components/NewDocForm';


class NewDocument extends Component {
    render() {
        return (
            <div>
               <NewDocHeader/>
               <NewDocForm/> 
               <Footer/>
            </div>
        );
    }
}

export default NewDocument;