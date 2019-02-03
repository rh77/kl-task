import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import { HighlighterFunc } from '../Common/SearchStrategy/ISearchStrategy';
import SorterHelper, { ISortUsersInfo } from '../Common/SorterHelper';
import SortSwitcher from './SortSwitcher/SortSwitcher';
import Tile from './Tile';
import "./Tiles.scss";

interface ITilesProps {
    users: UserModel[];
    highlighter: HighlighterFunc;
}

interface ITilesState extends ISortUsersInfo {
    highlighter: HighlighterFunc;
}

export default class Tiles extends Component<ITilesProps, ITilesState> {
    private placeholders: JSX.Element[];

    constructor(props: ITilesProps) {
        super(props);

        // This is a trick for last tiles to grow like the others
        const placeHolderKeys = new Array(10).fill(0); 
        this.placeholders = placeHolderKeys.map((_, i) => {
            return <li key={"placeholder" + i} className="user-tiles__placeholder"/>;
        });

        this.state = {
            highlighter: props.highlighter,
            isDescending: false,
            sortedFields: [],
            users: props.users
        };

        this.sort = this.sort.bind(this);
    }

    public render() {
        const { users, highlighter } = this.state;
        const data = users
                        .map((user) => <Tile key={user.id} userModel={user} highlighter={highlighter}/>)
                        .concat(this.placeholders);

        return (
            <div>
                <div className="settings-container">
                    <SortSwitcher onSort={this.sort}/>
                </div>
                <ul className="user-tiles">{data}</ul>
            </div>
            );
    }

    public componentWillReceiveProps(newProps: ITilesProps) {

        const { isDescending, sortedFields, users } = this.state;
        const sortInfo: ISortUsersInfo = {
            isDescending,
            sortedFields,
            users: newProps.users
        };
        const updatedUsers = sortedFields.length 
                    ? SorterHelper.sortUsers(sortInfo).users 
                    : newProps.users;
        sortInfo.users = updatedUsers;

        const hasChanged = newProps.highlighter !== this.props.highlighter
                        || updatedUsers.length !== users.length 
                        || updatedUsers.some((user: UserModel, i: number) => users[i].id !== user.id);

        if (!hasChanged) {
            return;
        }

        this.setState({
            highlighter: newProps.highlighter,
            ...sortInfo
        });
    }

    private sort(isDescending: boolean, fields: string[]) {
        if (!fields.length) {
            return;
        }
        const sortInfo: ISortUsersInfo = {
            isDescending,
            sortedFields: fields,
            users: this.props.users
        };
        SorterHelper.sortUsers(sortInfo);
        this.setState(sortInfo);
    }
}
