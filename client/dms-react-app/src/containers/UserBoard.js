import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import NewDocButton from '../components/NewDocButton/NewDocButton';
import GroupView from '../components/GroupView/GroupView';
import UserDocList from '../components/UserDocList/UserDocList';

class UserBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="UserBoard">
                <UserNavbar/>
                <NewDocButton/>
                <p className="headers" >IŠSAUGOTI DOKUMENTAI</p>
                <GroupView/>
                <UserDocList token={ this.props.token }/>                
                <Footer/> 
            </div>
        );
    }
}

export default UserBoard;