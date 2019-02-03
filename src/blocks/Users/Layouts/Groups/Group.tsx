import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import { HighlighterFunc } from '../ISearchStrategy';
import "./Groups.scss";
import UserPlate from './UserPlate';

interface ISortedState {
    users: UserModel[];
    isSorted: boolean;
    isDescending: boolean;
}

interface IGroupState extends ISortedState {
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
            isSorted: false,
            users: props.users
        };

        this.sort = this.sort.bind(this);
    }

    public render() {
        const { header } = this.props;
        const { users, isDescending, isSorted, highlighter } = this.state;
        const headerSortedClass = isSorted ? (" group-header_sorted" + (isDescending ? "_desc" : "_asc")) : "";
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
        const { isDescending, isSorted, users } = this.state;
        const updatedUsers = isSorted ? Group.getSortedState(newProps.users, isDescending).users : newProps.users;
        const hasChanged = newProps.highlighter !== this.props.highlighter
                        || updatedUsers.length !== users.length 
                        || updatedUsers.some((user: UserModel, i: number) => users[i].id !== user.id);

        if (!hasChanged) {
            return;
        }

        this.setState({
            highlighter: newProps.highlighter,
            isDescending,
            isSorted,
            users: updatedUsers
        });
    }

    private sort() {
        const isDescending = this.state.isSorted ? !this.state.isDescending : false;
        this.setState(Group.getSortedState(this.state.users, isDescending));
    }

    private static getSortedState(users: UserModel[], isDescending: boolean): ISortedState {

        const comparer = isDescending ? 
                                (a: UserModel, b: UserModel) => {
                                    return a.name > b.name ? -1 : 1;
                                }
                            :
                                (a: UserModel, b: UserModel) => {
                                    return a.name > b.name ? 1 : -1;
                                };
       
        const newState = {
            isDescending,
            isSorted: true,
            users: users.sort(comparer)
        };

        return newState;
    }
}
