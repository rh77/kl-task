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
        return <Line key={key} valueObject={value} isUnmanaged={value.id!.indexOf('5') >= 10}/>;
    }
}

const Line = (props: { valueObject: UserModel, isUnmanaged: boolean}): JSX.Element => {
    const classes = 
          "users-table__cell " 
           + (props.isUnmanaged ? "users-table__cell_unmanaged" : "");
    const line = <div className={classes}>{props.valueObject.id}</div>;
    return line;
};
