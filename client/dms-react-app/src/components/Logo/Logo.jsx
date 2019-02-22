import React, { Component } from 'react';
import fine from './fine.jpg';
import './Logo.css';


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