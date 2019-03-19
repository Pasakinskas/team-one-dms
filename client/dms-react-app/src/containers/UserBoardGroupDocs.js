import React, { Component } from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import SelectedGroupDocs from '../components/SelectedGroupDocs/SelectedGroupDocs';
import ViewMyGroups from '../components/SelectedGroupDocs/ViewMyGroups';


export default class UserBoardGroupDocs extends Component {
    render() {
        return (
            <div className="UserBoardGroupDocs">
                <UserNavbar/>
                <p className="headers">DOKUMENTAI</p>
                {/*users group list*/}
                <ViewMyGroups/>
                {/*Doc list from all user groups*/}
                <SelectedGroupDocs/>
                <Footer/>
            </div>
        );
    }
}