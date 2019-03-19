import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import NewDocButton from '../components/NewDocButton/NewDocButton';
import GroupView from '../components/GroupView/GroupView';
import UserDocListSubmited from '../components/UserDocListSubmited/UserDocListSubmited';

class UserBoardSubmitedDoc extends Component {
    render() {
        return (
            <div className="UserBoardGetedDoc">
                <UserNavbar/>
                <NewDocButton/>
                <p className="headers">PATEIKTI DOKUMENTAI</p>
                <GroupView/>
                <UserDocListSubmited token={ this.props.token }/>
                <Footer/>
            </div>
        );
    }
}

export default UserBoardSubmitedDoc;