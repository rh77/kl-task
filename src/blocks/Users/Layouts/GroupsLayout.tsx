import React from 'react';
import "./Groups.scss";
import ILayoutStrategy from './ILayoutStrategy';

export default class GroupsLayout implements ILayoutStrategy {

    public render(data: any[]) {
        return (
                <ul className="user-groups">
                    {data.map((val: number) => this.renderGroup(val, val))}
                </ul>);
    }

    private renderGroup(key: any, value: any): JSX.Element {
        return <Group key={key} valueObject={value}/>;
    }
}
  
const Group = (props: { valueObject: number }): JSX.Element => {
    return <li className="user-groups__group">{props.valueObject}</li>;
};
