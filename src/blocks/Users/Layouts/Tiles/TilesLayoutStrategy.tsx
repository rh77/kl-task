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

        this.searchStrategy.setup(searchString);
        this.users = users.filter((user) => this.searchStrategy.tryFind(user.name));  
    }

    public render() {
        
        const data = this.users.map(this.renderTile).concat(this.placeholders);

        return (
            <div>
                <div className="sort">
                    <label className="sort__label">Sort by:</label>
                    <select className="sort__select" size={1}>
                        <option value="name">name</option>
                        <option value="group">group</option>
                        <option value="group-name">group, then by name</option>
                    </select>
                    <select className="sort__select" size={1}>
                        <option value="name">ascending</option>
                        <option value="group">descending</option>
                    </select>
                </div>
                <ul className="user-tiles">{data}</ul>
            </div>
            );
    }

    private renderTile(userModel: UserModel): JSX.Element {
        return <Tile key={userModel.id} userModel={userModel}/>;
    }
}
