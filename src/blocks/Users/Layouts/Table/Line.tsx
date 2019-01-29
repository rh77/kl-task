import React from 'react';
import UserModel from '../../../../model/userModel';
import "./Table.scss";

const Line = (props: { userModel: UserModel}): JSX.Element => {

    const {name, company, email, group, groupId, phone} = props.userModel;
    const classes = "users-table__row" + (groupId === 0 ? " users-table__row_unmanaged" : "");
    const line = (
            <div className={classes}>
                <div className="users-table__cell">{name}</div>
                <div className="users-table__cell">{company}</div>
                <div className="users-table__cell">{email}</div>
                <div className="users-table__cell">{group}</div>
                <div className="users-table__cell">{phone}</div>
            </div>);

    return line;
};

export default Line;
