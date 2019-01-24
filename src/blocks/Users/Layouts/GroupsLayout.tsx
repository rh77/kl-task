import React from 'react';
import "./Groups.scss";
import ILayoutStrategy from './ILayoutStrategy';

export default class GroupsLayout implements ILayoutStrategy {
    private data: any[] = [];

    public setup(data: any[]) {
        this.data = data;
    }

    public render() {
        return (
                <ul className="user-groups">
                    {this.data.map((val: any) => this.renderGroup(val, val))}
                </ul>);
    }

    private renderGroup(key: any, value: any): JSX.Element {
        return <Group key={key} valueObject={value}/>;
    }
}
  
const Group = (props: { valueObject: any }): JSX.Element => {
    return <li className="user-groups__group">{props.valueObject}</li>;
};
