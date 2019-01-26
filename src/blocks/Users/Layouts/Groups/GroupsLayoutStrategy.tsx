import React from 'react';
import UserModel from '../../../../model/userModel';
import ILayoutStrategy from '../ILayoutStrategy';
import "./Groups.scss";

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
                    {this.groups.map((val: UserGroup) => this.renderGroup(val))}
                </ul>);
    }

    private renderGroup(userGroup: UserGroup): JSX.Element {
        const groupName = userGroup[0];
        return <Group key={groupName} userGroup={userGroup}/>;
    }
}
  
const Group = (props: { userGroup: UserGroup }): JSX.Element => {
    const groupName = props.userGroup[0];
    const groupUsers = props.userGroup[1];
    return (
        <li className="user-groups__group">
            <div className="group-header">{groupName}</div>
            <ul className="user-plates-list">
                {groupUsers.map((user: UserModel) => <UserPlate key={user.id} userModel={user}/>)}
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
