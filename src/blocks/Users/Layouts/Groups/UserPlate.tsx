import React from 'react';
import UserModel from '../../../../model/userModel';
import HighlightedToken from '../Common/HighlightedToken/HighlightedToken';
import { HighlighterFunc } from '../Common/SearchStrategy/ISearchStrategy';
import "./Groups.scss";

interface IUserPlateProps {
    userModel: UserModel;
    highlighter: HighlighterFunc;
}

const UserPlate = (props: IUserPlateProps): JSX.Element => {

    const highlightedNameTokens = props.highlighter(props.userModel.name);
    const highlightedName = highlightedNameTokens.map((token, i) => <HighlightedToken token={token} key={i}/>);
    return (
        <li className="user-plate">
            <label className="user-plate__name">{highlightedName}</label>
            <label className="user-plate__email">{props.userModel.email}</label>
        </li>
    );
};

export default UserPlate;
