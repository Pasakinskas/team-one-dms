import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import NewDocButton from '../components/NewDocButton/NewDocButton';
import GroupView from '../components/GroupView/GroupView';
import UserDocListGeted from '../components/UserDocListGeted/UserDocListGeted';


class UserBoardGetedDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="UserBoardGetedDoc">
                <UserNavbar/>
                <NewDocButton/>
                <p className="headers">GAUTI DOKUMENTAI</p>
                <GroupView/>
                <UserDocListGeted  token={ this.props.token }/>
                <Footer/>
            </div>
        );
    }
}

export default UserBoardGetedDoc;