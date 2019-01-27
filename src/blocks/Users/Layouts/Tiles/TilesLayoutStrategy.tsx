import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy from '../ISearchStrategy';
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
        if (!searchString) {
            this.users = users;
            return;
        }

        this.users = users.filter((user) => this.searchStrategy.tryFind(user.name, searchString));  
    }

    public render() {
        
        const data = this.users
            .map((val: UserModel) => this.renderTile(val))
            .concat(this.placeholders);

        return <ul className="user-tiles">{data}</ul>;
    }

    private renderTile(userModel: UserModel): JSX.Element {
        return <Tile key={userModel.id} userModel={userModel}/>;
    }
}
