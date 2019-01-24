import React from 'react';
import UserModel from '../../../model/userModel';
import "./Groups.scss";
import ILayoutStrategy from './ILayoutStrategy';

type UserGroup = [string, UserModel[]];

export default class GroupsLayoutStrategy implements ILayoutStrategy {
    
    private groups: UserGroup[] = [];

    public setup(data: UserModel[]) {

        for (const userModel of data) {

            const userGroups = this.groups.filter((group: UserGroup) => group[0] === userModel.group);

            let userGroup: UserGroup;
            if (userGroups.length === 0) {
                userGroup = [userModel.group, []];
                this.groups.push(userGroup);
            } else {
                userGroup = userGroups[0];
            }

            userGroup[1].push(userModel);
        }
    }

    public render() {
        return (
                <ul className="user-groups">
                    {this.groups.map((val: UserGroup) => this.renderGroup(val[0], val))}
                </ul>);
    }

    private renderGroup(key: string, value: UserGroup): JSX.Element {
        return <Group key={key} valueObject={value}/>;
    }
}
  
const Group = (props: { valueObject: UserGroup }): JSX.Element => {
    return <li className="user-groups__group">{props.valueObject[0]}</li>;
};
