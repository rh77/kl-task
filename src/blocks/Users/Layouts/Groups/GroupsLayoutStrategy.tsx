import React from 'react';
import UserModel from '../../../../model/userModel';
import ILayoutStrategy from '../Common/LayoutStrategy/ILayoutStrategy';
import CaseInsensitiveSearchStrategy from '../Common/SearchStrategy/CaseInsensitiveSearchStrategy';
import ISearchStrategy, { HighlighterFunc } from '../Common/SearchStrategy/ISearchStrategy';
import Group from './Group';
import "./Groups.scss";

interface IUserGroup { 
    name: string; 
    id: number;
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
                if (group.id === userModel.groupId) {
                    targetGroup = group;
                    break;
                }
            }

            let userGroup: IUserGroup;
            if (!targetGroup) {
                userGroup = { name: userModel.group, id: userModel.groupId, users: [] };
                userGroup.id === 0 ? groups.unshift(userGroup) : groups.push(userGroup);
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
        const { name, id, users } = userGroup;
        return <Group key={id} header={name} users={users} highlighter={highlighter} canAdd={id !== 0}/>;
    }
}
