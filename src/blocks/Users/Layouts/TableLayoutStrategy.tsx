import React from 'react';
import UserModel from '../../../model/userModel';
import ILayoutStrategy from './ILayoutStrategy';
import "./Table.scss";
import groups from '../../../model/groups';

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

    const classes = 
          "users-table__row " 
           + (props.isUnmanaged ? "users-table__row_unmanaged" : "");
    const line = (
            <div className={classes}>
                <div className="users-table__cell">{props.valueObject.name}</div>
                <div className="users-table__cell">{props.valueObject.company}</div>
                <div className="users-table__cell">{props.valueObject.email}</div>
                <div className="users-table__cell">{props.valueObject.group}</div>
                <div className="users-table__cell">{props.valueObject.phone}</div>
            </div>);

    return line;
};
