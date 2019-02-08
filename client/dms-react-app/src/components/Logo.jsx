import React, { Component } from 'react';
import fine from '../img/fine.jpg';
import '../css/Logo.css';


class Logo extends Component {
    render() {
        return (
            <div className='container'> 
               <img src={fine} alt=''></img> 
            </div>
        );
    }
}

export default Logo;