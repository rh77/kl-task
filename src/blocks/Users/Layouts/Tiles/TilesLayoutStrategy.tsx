import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy from '../ISearchStrategy';
import Tiles from './Tiles';
import "./Tiles.scss";

export default class TilesLayoutStrategy implements ILayoutStrategy {
    private users: UserModel[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();

    public setup(users: UserModel[], searchString?: string) {

        this.searchStrategy.setTargetText(searchString);

        if (!searchString) {
            this.users = users;
            return;
        }

        this.users = users.filter((user) => this.searchStrategy.tryFind(user.name));  
    }

    public render() {
        
        const highlighter = this.searchStrategy.getHighlighterFunction();
        return <Tiles users={this.users} highlighter={highlighter}/>;
    }
}
