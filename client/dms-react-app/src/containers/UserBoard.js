import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import NewDocButton from '../components/NewDocButton/NewDocButton';
import GroupView from '../components/GroupView/GroupView';
import Pagening from '../components/Pagening/Pagening';

class UserBoard extends Component {
    render() {
        return (
            <div className="UserBoard">
                <UserNavbar/>
                <NewDocButton/>
                <GroupView/>
                <Pagening/>
                <Footer/> 
            </div>
        );
    }
}

export default UserBoard;