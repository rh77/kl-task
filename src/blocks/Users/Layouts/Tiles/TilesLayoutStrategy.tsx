import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy, { HighlighterFunc } from '../ISearchStrategy';
import SortSwitcher from './SortSwitcher';
import Tile from './Tile';
import "./Tiles.scss";

export default class TilesLayoutStrategy implements ILayoutStrategy {
    private placeholders: JSX.Element[];
    private users: UserModel[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();

    constructor() {
        // This is a trick for last tiles to grow like the others. Remove when grid layout is supported
        const placeHolderKeys = new Array(10).fill(0); 
        this.placeholders = placeHolderKeys.map((_, i) => {
            return <li key={"placeholder" + i} className="user-tiles__placeholder"/>;
        });
    }

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
        const data = this.users.map((user) => this.renderTile(user, highlighter)).concat(this.placeholders);

        return (
            <div>
                <SortSwitcher/>
                <ul className="user-tiles">{data}</ul>
            </div>
            );
    }

    private renderTile(userModel: UserModel, highlighter: HighlighterFunc): JSX.Element {       
        return <Tile key={userModel.id} userModel={userModel} highlighter={highlighter}/>;
    }
}
