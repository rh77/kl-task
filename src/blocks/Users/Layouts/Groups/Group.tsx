import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import "./Groups.scss";

interface IGroupState {
    users: UserModel[];
    isSorted: boolean;
    isDescending: boolean;
}

export default class Group extends Component<{ header: string, users: UserModel[] }, IGroupState> {

    constructor(props) {
        super(props);

        this.state = {
            isDescending: false,
            isSorted: false,
            users: props.users
        };

        this.sort = this.sort.bind(this);
    }

    public render() {
        const { header } = this.props;
        const { users, isDescending, isSorted } = this.state;
        const headerSortedClass = isSorted ? (" group-header_sorted" + (isDescending ? "_desc" : "_asc")) : "";
        return (
            <li className="user-groups__group">
                <div className="user-group-wrapper">
                    <div className={"group-header" + headerSortedClass} onClick={this.sort}>{header}</div>
                    <ul className="user-plates-list">
                        {users.map((user: UserModel) => <UserPlate key={user.id} userModel={user}/>)}
                    </ul>
                    <label className="group-footer-label">Add user...</label>
                </div>
            </li>
        );
    }

    private sort() {
        const isDescending = this.state.isSorted ? !this.state.isDescending : false;
        const comparer = isDescending ? 
                                (a: UserModel, b: UserModel) => {
                                    return a.name > b.name ? -1 : 1;
                                }
                            :
                                (a: UserModel, b: UserModel) => {
                                    return a.name > b.name ? 1 : -1;
                                };

        this.setState({
            isDescending,
            isSorted: true,
            users: this.state.users.sort(comparer)
        });
    }
}

const UserPlate = (props: { userModel: UserModel }): JSX.Element => {
    return (
        <li className="user-plate">
            <label className="user-plate__name">{props.userModel.name}</label>
            <label className="user-plate__email">{props.userModel.email}</label>
        </li>
    );
};
