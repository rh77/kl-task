import React from 'react';
import UserModel from '../../../model/userModel';
import ILayoutStrategy from './ILayoutStrategy';
import "./Tiles.scss";

export default class TilesLayoutStrategy implements ILayoutStrategy {
    private placeholders: JSX.Element[];
    private data: UserModel[] = [];

    constructor() {
        // todo: replace whith grid layout when IE supports it
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
            .map((val: UserModel) => this.renderTile(val.id, val))
            .concat(this.placeholders);

        return <ul className="user-tiles">{data}</ul>;
    }

    private renderTile(key: string, value: UserModel): JSX.Element {
        return <Tile key={key} valueObject={value}/>;
    }
}
  
const Tile = (props: { valueObject: UserModel }): JSX.Element => {
    return <li className="user-tiles__tile">{props.valueObject.id}</li>;
};
