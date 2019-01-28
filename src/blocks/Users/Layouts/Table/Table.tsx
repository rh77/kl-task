import React, {Component} from 'react';
import UserModel from '../../../../model/userModel';
import "./Table.scss";

interface ITableState {
    users: UserModel[];
    sortedField?: string;
    isDescending: boolean;
}

export default class Table extends Component<{users: UserModel[]}, ITableState> {

    constructor(props) {
        super(props);

        this.state = {
            isDescending: false,
            sortedField: undefined,
            users: props.users
        };

        this.sort = this.sort.bind(this);
    }

    public render() {

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
                {this.state.users.map((userModel: UserModel) => <Line key={userModel.id} userModel={userModel} />)}
            </div>);
    }

    private sort(field: string) {

        const isDescending = field === this.state.sortedField ? !this.state.isDescending : false;
        const comparer = isDescending ? 
                                (a: UserModel, b: UserModel) => {
                                    return a[field] > b[field] ? -1 : 1;
                                }
                            :
                                (a: UserModel, b: UserModel) => {
                                    return a[field] > b[field] ? 1 : -1;
                                };
       
        this.setState({
            isDescending,
            sortedField: field,
            users: this.state.users.sort(comparer)
        });
    }
}

interface IHeadingCellProps { 
    fieldName: string; 
    title: string;
    isDescending: boolean;
    isSorted: boolean;
    onClick: (field: string) => void;
}

const HeadingCell = (props: IHeadingCellProps): JSX.Element => {

    const { fieldName, title, isDescending, isSorted, onClick } = props;
    const clickHandler = (e: React.FormEvent<HTMLDivElement>) => onClick(fieldName);

    const headerSortedClass = isSorted ? (" group-header_sorted" + (isDescending ? "_desc" : "_asc")) : "";
    return (
            <div 
                className={"users-table__cell users-table__cell_heading" + headerSortedClass} 
                onClick={clickHandler}
            >
                {title}
            </div>);
};

const Line = (props: { userModel: UserModel}): JSX.Element => {

    const {name, company, email, group, groupId, phone} = props.userModel;
    const classes = "users-table__row" + (groupId === 0 ? " users-table__row_unmanaged" : "");
    const line = (
            <div className={classes}>
                <div className="users-table__cell">{name}</div>
                <div className="users-table__cell">{company}</div>
                <div className="users-table__cell">{email}</div>
                <div className="users-table__cell">{group}</div>
                <div className="users-table__cell">{phone}</div>
            </div>);

    return line;
};
