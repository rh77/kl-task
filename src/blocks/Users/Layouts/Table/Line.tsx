import React from 'react';
import UserModel from '../../../../model/userModel';
import HighlightedToken from '../Common/HighlightedToken';
import { HighlighterFunc } from '../ISearchStrategy';
import "./Table.scss";

interface ILineProps {
    userModel: UserModel;
    highlighter: HighlighterFunc;
}

const Line = (props: ILineProps): JSX.Element => {

    const {name, company, email, group, groupId, phone} = props.userModel;
    const highlightedNameTokens = props.highlighter(name);
    const highlightedName = highlightedNameTokens.map((token, i) => <HighlightedToken token={token} key={i}/>);
    const classes = "users-table__row" + (groupId === 0 ? " users-table__row_unmanaged" : "");
    const line = (
            <div className={classes}>
                <div className="users-table__cell">{highlightedName}</div>
                <div className="users-table__cell">{company}</div>
                <div className="users-table__cell">{email}</div>
                <div className="users-table__cell">{group}</div>
                <div className="users-table__cell">{phone}</div>
            </div>);

    return line;
};

export default Line;
