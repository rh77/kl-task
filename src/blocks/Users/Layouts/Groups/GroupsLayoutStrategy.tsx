import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy, { HighlighterFunc } from '../ISearchStrategy';
import Group from './Group';
import "./Groups.scss";

interface IUserGroup { 
    name: string; 
    users: UserModel[];
}

export default class GroupsLayoutStrategy implements ILayoutStrategy {
    
    private groups: IUserGroup[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();

    public setup(data: UserModel[], searchString?: string) {

        this.searchStrategy.setTargetText(searchString);
        const groups: IUserGroup[] = [];

        for (const userModel of data) {

            if (searchString && !this.searchStrategy.tryFind(userModel.name)) {
                continue;
            }

            let targetGroup: IUserGroup | null = null;
            for (const group of groups) {
                if (group.name === userModel.group) {
                    targetGroup = group;
                    break;
                }
            }

            let userGroup: IUserGroup;
            if (!targetGroup) {
                userGroup = { name: userModel.group, users: [] };
                groups.push(userGroup);
            } else {
                userGroup = targetGroup;
            }

            userGroup.users.push(userModel);
        }

        this.groups = groups;
    }

    public render() {
        const highlighter = this.searchStrategy.getHighlighterFunction();
        return (
                <ul className="user-groups">
                    {this.groups.map((group) => this.renderGroup(group, highlighter))}
                </ul>);
    }

    private renderGroup(userGroup: IUserGroup, highlighter: HighlighterFunc): JSX.Element {
        const { name, users } = userGroup;
        return <Group key={name} header={name} users={users} highlighter={highlighter}/>;
    }
}
