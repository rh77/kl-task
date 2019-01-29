import React from 'react';
import UserModel from '../../../../model/userModel';
import "./Groups.scss";

const UserPlate = (props: { userModel: UserModel }): JSX.Element => {
    return (
        <li className="user-plate">
            <label className="user-plate__name">{props.userModel.name}</label>
            <label className="user-plate__email">{props.userModel.email}</label>
        </li>
    );
};

export default UserPlate;
