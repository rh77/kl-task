import React from 'react';
import ILayoutStrategy from './ILayoutStrategy';
import "./Table.scss";

export default class TableLayout implements ILayoutStrategy {

    public render(data: any[]) {
        return (
            <div className="users-table">
                {data.map((val: any) => this.renderLine(val, val))}
            </div>);
    }

    private renderLine(key: any, value: any): JSX.Element {
        return <Line key={key} valueObject={value} isUnmanaged={value.toString().indexOf('5') >= 10}/>;
    }
}

const Line = (props: { valueObject: any, isUnmanaged: boolean}): JSX.Element => {
    const classes = 
          "users-table__cell " 
           + (props.isUnmanaged ? "users-table__cell_unmanaged" : "");
    const line = <div className={classes}>{props.valueObject}</div>;
    return line;
};
