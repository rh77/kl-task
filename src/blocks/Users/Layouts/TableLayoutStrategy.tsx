import React from 'react';
import UserModel from '../../../model/userModel';
import ILayoutStrategy from './ILayoutStrategy';
import "./Table.scss";

export default class TableLayoutStrategy implements ILayoutStrategy {
    private data: UserModel[] = [];

    public setup(data: UserModel[]) {
        this.data = data;
    }

    public render() {
        return (
            <div className="users-table">
                {this.data.map((val: UserModel) => this.renderLine(val.id, val))}
            </div>);
    }

    private renderLine(key: string, value: UserModel): JSX.Element {
        return <Line key={key} valueObject={value} isUnmanaged={value.groupId === 0}/>;
    }
}

const Line = (props: { valueObject: UserModel, isUnmanaged: boolean}): JSX.Element => {

    const {name, company, email, group, groupId, phone} = props.valueObject;
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
