import React, { Component } from 'react';
import '../App.css';

class InpuReg extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <div className="input">
       <input className='userName' placeholder='Įrašykite vartotojo vardą'/>
       <input className='email' placeholder='Įrašykite el. paštą'/>
       <sellect className='possition' placeholder='Pasirinkite pareigas'/>
       <input className='password' placeholder='Įrašykite slaptažodį'/>
       <input className='passwordConfirmation' placeholder='Pakartokite slaptažodį'/>
      </div>
    );
  }
}

export default InputReg;