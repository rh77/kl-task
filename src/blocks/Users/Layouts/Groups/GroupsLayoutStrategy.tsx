import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy from '../ISearchStrategy';
import "./Groups.scss";

type UserGroup = [string, UserModel[]];

export default class GroupsLayoutStrategy implements ILayoutStrategy {
    
    private groups: UserGroup[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();

    public setup(data: UserModel[], searchString?: string) {

        const groups: UserGroup[] = [];
        for (const userModel of data) {

            if (searchString && !this.searchStrategy.tryFind(userModel.name, searchString)) {
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
                    {this.groups.map((val: UserGroup) => this.renderGroup(val))}
                </ul>);
    }

    private renderGroup(userGroup: UserGroup): JSX.Element {
        const groupName = userGroup[0];
        const groupUsers = userGroup[1];
        return <Group key={groupName} header={groupName} users={groupUsers}/>;
    }
}
  
const Group = (props: { header: string, users: UserModel[] }): JSX.Element => {
    const { header, users } = props;
    return (
        <li className="user-groups__group">
            <div className="group-header">{header}</div>
            <ul className="user-plates-list">
                {users.map((user: UserModel) => <UserPlate key={user.id} userModel={user}/>)}
            </ul>
            <label className="group-footer-label">Add user...</label>
        </li>
    );
};

const UserPlate = (props: { userModel: UserModel }): JSX.Element => {
    return (
        <li className="user-plate">
            <label className="user-plate__name">{props.userModel.name}</label>
            <label className="user-plate__email">{props.userModel.email}</label>
        </li>
    );
};
