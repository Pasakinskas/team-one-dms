import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import NewDocButton from '../components/NewDocButton';
import GroupView from '../components/GroupView';
import Pagening from '../components/Pagening';

class UserBoardGetedDoc extends Component {
    render() {
        return (
            <div className="UserBoardGetedDoc">
                <UserNavbar/>
                <NewDocButton/>
                <GroupView/>
                <Pagening/>
                <Footer/>
            </div>
        );
    }
}

export default UserBoardGetedDoc;