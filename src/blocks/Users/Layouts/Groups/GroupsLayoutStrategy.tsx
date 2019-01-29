import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy from '../ISearchStrategy';
import Group from './Group';
import "./Groups.scss";

type UserGroup = [string, UserModel[]];

export default class GroupsLayoutStrategy implements ILayoutStrategy {
    
    private groups: UserGroup[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();

    public setup(data: UserModel[], searchString?: string) {

        this.searchStrategy.setup(searchString);
        const groups: UserGroup[] = [];

        for (const userModel of data) {

            if (searchString && !this.searchStrategy.tryFind(userModel.name)) {
                continue;
            }

            let targetGroup: UserGroup | null = null;
            for (const group of groups) {
                if (group[0] === userModel.group) {
                    targetGroup = group;
                    break;
                }
            }

            let userGroup: UserGroup;
            if (!targetGroup) {
                userGroup = [userModel.group, []];
                groups.push(userGroup);
            } else {
                userGroup = targetGroup;
            }

            userGroup[1].push(userModel);
        }

        this.groups = groups;
    }

    public render() {
        return (
                <ul className="user-groups">
                    {this.groups.map(this.renderGroup)}
                </ul>);
    }

    private renderGroup(userGroup: UserGroup): JSX.Element {
        const groupName = userGroup[0];
        const groupUsers = userGroup[1];
        return <Group key={groupName} header={groupName} users={groupUsers}/>;
    }
}
