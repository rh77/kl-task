import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import { HighlighterFunc } from '../Common/SearchStrategy/ISearchStrategy';
import SorterHelper, { ISortUsersInfo } from '../Common/SorterHelper';
import "./Groups.scss";
import UserPlate from './UserPlate';

interface IGroupState extends ISortUsersInfo {
    highlighter: HighlighterFunc; 
}

interface IGroupProps {
    header: string;
    highlighter: HighlighterFunc; 
    users: UserModel[];
    canAdd: boolean;
}

export default class Group extends Component<IGroupProps, IGroupState> {

    constructor(props: IGroupProps) {
        super(props);

        this.state = {
            highlighter: props.highlighter,
            isDescending: false,
            sortedFields: [],
            users: props.users
        };

        this.sort = this.sort.bind(this);
    }

    public render() {
        const { header } = this.props;
        const { users, isDescending, sortedFields, highlighter } = this.state;
        const headerSortedClass = sortedFields.length 
                                        ? (" group-header_sorted" + (isDescending ? "_desc" : "_asc")) 
                                        : "";
        return (
            <li className="user-groups__group">
                <div className="user-group-wrapper">
                    <div className={"group-header" + headerSortedClass} onClick={this.sort}>{header}</div>
                    <ul className="user-plates-list">
                        {users.map((user) => <UserPlate key={user.id} userModel={user} highlighter={highlighter}/>)}
                    </ul>
                    {this.props.canAdd ? <label className="group-footer-label">Add user...</label> : <React.Fragment/>}
                </div>
            </li>
        );
    }

    public componentWillReceiveProps(newProps: IGroupProps) {
        const { isDescending, sortedFields, users } = this.state;
        const sortInfo: ISortUsersInfo = {
            isDescending,
            sortedFields,
            users: newProps.users
        };
        const updatedUsers = sortedFields.length 
                                ? SorterHelper.sortUsers(sortInfo).users 
                                : newProps.users;
        sortInfo.users = updatedUsers;
        
        const hasChanged = newProps.highlighter !== this.props.highlighter
                        || updatedUsers.length !== users.length 
                        || updatedUsers.some((user: UserModel, i: number) => users[i].id !== user.id);

        if (!hasChanged) {
            return;
        }

        this.setState({
            highlighter: newProps.highlighter,
            ...sortInfo
        });
    }

    private sort() {
        const isDescending = this.state.sortedFields.length ? !this.state.isDescending : false;
        const sortedFields = [ "name" ];
        const sortInfo: ISortUsersInfo = {
            isDescending,
            sortedFields,
            users: this.props.users
        };
        SorterHelper.sortUsers(sortInfo);
        this.setState(sortInfo);
    }
}
