import React from 'react';
import UserModel from '../../../../model/userModel';
import ILayoutStrategy from '../ILayoutStrategy';
import Tile from './Tile';
import "./Tiles.scss";

export default class TilesLayoutStrategy implements ILayoutStrategy {
    private placeholders: JSX.Element[];
    private data: UserModel[] = [];

    constructor() {
        // This is a trick for last tiles to grow like the others. Remove when grid layout is supported
        const placeHolderKeys = new Array(10).fill(0); 
        this.placeholders = placeHolderKeys.map((_, i) => {
            return <li key={"placeholder" + i} className="user-tiles__placeholder"/>;
        });
    }

    public setup(data: UserModel[]) {
        this.data = data;
    }

    public render() {
        
        const data = this.data
            .map((val: UserModel) => this.renderTile(val))
            .concat(this.placeholders);

        return <ul className="user-tiles">{data}</ul>;
    }

    private renderTile(userModel: UserModel): JSX.Element {
        return <Tile key={userModel.id} userModel={userModel}/>;
    }
}
