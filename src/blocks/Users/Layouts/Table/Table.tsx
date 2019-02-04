import React, {Component} from 'react';
import UserModel from '../../../../model/userModel';
import { HighlighterFunc } from '../Common/SearchStrategy/ISearchStrategy';
import SorterHelper, { ISortUsersInfo } from '../Common/SorterHelper';
import HeadingCell from './HeadingCell';
import Line from './Line';
import "./Table.scss";

interface ITableState extends ISortUsersInfo {
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
            sortedFields: [],
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
                        isSorted={this.state.sortedFields.includes("name")} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="company" 
                        title="Company" 
                        isSorted={this.state.sortedFields.includes("company")} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="email" 
                        title="Email" 
                        isSorted={this.state.sortedFields.includes("email")} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="group" 
                        title="Group" 
                        isSorted={this.state.sortedFields.includes("group")} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                    <HeadingCell 
                        fieldName="phone" 
                        title="Phone" 
                        isSorted={this.state.sortedFields.includes("phone")} 
                        isDescending={this.state.isDescending} 
                        onClick={this.sort}
                    />
                </div>
                {users.map((userModel) => <Line key={userModel.id} userModel={userModel} highlighter={highlighter}/>)}
            </div>);
    }

    public componentWillReceiveProps(newProps: ITableProps) {

        const { isDescending, sortedFields } = this.state;
        const sortInfo: ISortUsersInfo = {
            isDescending,
            sortedFields,
            users: newProps.users
        };
        const updatedUsers = sortedFields.length 
                                ? SorterHelper.sortUsers(sortInfo).users 
                                : newProps.users;
        sortInfo.users = updatedUsers;

        this.setState({
            highlighter: newProps.highlighter,
            ...sortInfo
        });
    }

    private sort(field: string) {
        const isDescending = this.state.sortedFields.includes(field) ? !this.state.isDescending : false;
        const sortedFields = this.state.sortedFields.includes(field) ? this.state.sortedFields : [ field ];
        const sortInfo: ISortUsersInfo = {
            isDescending,
            sortedFields,
            users: this.props.users
        };
        SorterHelper.sortUsers(sortInfo);
        this.setState(sortInfo);
    }
}
