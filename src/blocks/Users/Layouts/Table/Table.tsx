import React, {Component} from 'react';
import UserModel from '../../../../model/userModel';
import { HighlighterFunc } from '../ISearchStrategy';
import HeadingCell from './HeadingCell';
import Line from './Line';
import "./Table.scss";

interface ISortedState {
    users: UserModel[];
    sortedField?: string;
    isDescending: boolean;
}

interface ITableState extends ISortedState {
    highlighter: HighlighterFunc;
}

interface ITableProps {
    users: UserModel[];
    highlighter: HighlighterFunc;
}

export default class Table extends Component<ITableProps, ITableState> {

    constructor(props: ITableProps) {
        super(props);

        this.state = {
            highlighter: props.highlighter,
            isDescending: false,
            sortedField: undefined,
            users: props.users
        };

        this.sort = this.sort.bind(this);
    }

    public render() {

        const { users, highlighter } = this.state;

        return (
            <div className="users-table">
                <div className="users-table__header">
                    <HeadingCell 
                        fieldName="name" 
                        title="Name" 
                        isSorted={this.state.sortedField === "name"} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="company" 
                        title="Company" 
                        isSorted={this.state.sortedField === "company"} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="email" 
                        title="Email" 
                        isSorted={this.state.sortedField === "email"} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="group" 
                        title="Group" 
                        isSorted={this.state.sortedField === "group"} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="phone" 
                        title="Phone" 
                        isSorted={this.state.sortedField === "phone"} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                </div>
                {users.map((userModel) => <Line key={userModel.id} userModel={userModel} highlighter={highlighter}/>)}
            </div>);
    }

    public componentWillReceiveProps(newProps: ITableProps) {

        const { isDescending, sortedField, users } = this.state;
        const updatedUsers = sortedField 
                    ? Table.getSortedState(newProps.users, isDescending, sortedField).users 
                    : newProps.users;
        const hasChanged = newProps.highlighter !== this.props.highlighter
                        || updatedUsers.length !== users.length 
                        || updatedUsers.some((user: UserModel, i: number) => users[i].id !== user.id);

        if (!hasChanged) {
            return;
        }

        this.setState({
            highlighter: newProps.highlighter,
            isDescending,
            sortedField,
            users: updatedUsers
        });
    }

    private sort(field: string) {
        const isDescending = field === this.state.sortedField ? !this.state.isDescending : false;
        this.setState(Table.getSortedState(this.props.users, isDescending, field));
    }

    private static getSortedState(users: UserModel[], isDescending: boolean, field: string): ISortedState {

        const comparer = isDescending ? 
                                (a: UserModel, b: UserModel) => {
                                    return a[field] > b[field] ? -1 : 1;
                                }
                            :
                                (a: UserModel, b: UserModel) => {
                                    return a[field] > b[field] ? 1 : -1;
                                };
       
        const newState = {
            isDescending,
            sortedField: field,
            users: users.slice().sort(comparer)
        };

        return newState;
    }
}
