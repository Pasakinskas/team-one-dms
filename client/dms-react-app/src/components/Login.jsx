import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class InputLogin extends Component {
    render() {
        return (
            <div>
                <input className='userEmail' placeholder='Įrašykite vartotojo vardą'/>
                <input className='password' placeholder='Įrašykite slaptažodį'/>
                <button >PRISIJUNGTI</button>

            </div>
        );
    }
}

export default InputLogin;