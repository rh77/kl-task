import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import { HighlighterFunc } from '../ISearchStrategy';
import SortSwitcher from './SortSwitcher/SortSwitcher';
import Tile from './Tile';
import "./Tiles.scss";

interface ITilesProps {
    users: UserModel[];
    highlighter: HighlighterFunc;
}

interface ISortedState {
    users: UserModel[];
    sortedFields: string[];
    isDescending: boolean;
}

interface ITilesState extends ISortedState {
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
        const updatedUsers = sortedFields.length 
                    ? Tiles.getSortedState(newProps.users, isDescending, sortedFields).users 
                    : newProps.users;
        const hasChanged = newProps.highlighter !== this.props.highlighter
                        || updatedUsers.length !== users.length 
                        || updatedUsers.some((user: UserModel, i: number) => users[i].id !== user.id);

        if (!hasChanged) {
            return;
        }

        this.setState({
            highlighter: newProps.highlighter,
            isDescending,
            sortedFields,
            users: updatedUsers
        });
    }

    private sort(isDescending: boolean, fields: string[]) {
        if (!fields.length) {
            return;
        }

        this.setState(Tiles.getSortedState(this.props.users, isDescending, fields));
    }

    private static getSortedState(users: UserModel[], isDescending: boolean, fields: string[]): ISortedState {

        let comparer: (a: UserModel, b: UserModel) => number;

        if (fields.length === 1) {
            const field = fields[0];
            if (isDescending) { 
                comparer = (a, b) => {
                    return a[field] > b[field] ? -1 : 1;
                };
            } else {
                comparer = (a, b) => {
                    return a[field] > b[field] ? 1 : -1;
                };
            }
        } else {

            const greater = isDescending ? -1 : 1;
            const lower = isDescending ? 1 : -1;
            comparer = (a, b) => {
                for (const field of fields) {
                    const aField = a[field];
                    const bField = b[field];
                    if (aField === bField) {
                        continue;
                    }

                    return aField > bField ? greater : lower;
                }

                return 0;
            };
        }
       
        const newState = {
            isDescending,
            sortedFields: fields,
            users: users.sort(comparer)
        };

        return newState;
    }
}
