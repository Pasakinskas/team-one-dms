import React, { Component } from 'react';
import doc from './doc.png';
import './Logo.css';


class Logo extends Component {
    render() {
        return (
            <div className='container'> 
                <img src={doc} alt='' style={{"hight":"400px", "width":"400px", "marginTop":"70px"}}></img> 
                <p style={{"fontSize":"1.5em","padding":"50px 0 50px 0", "marginLeft":"0", "fontWeight":"700"}}> DOKUMENTŲ VALDYMO SISTEMA</p>
            </div>
        );
    }
}

export default Logo;