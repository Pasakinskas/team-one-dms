import React, { Component } from 'react';
import './Pagening.css';

class Pagening extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="pageningCont">
                <nav className="pagening" >
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Pradinis</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Paskutinis</a></li>
                </ul>
                </nav>
            </div>
        )
    }
}
export default Pagening;