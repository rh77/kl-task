import React from 'react';
import ILayoutStrategy from './ILayoutStrategy';
import "./Tiles.scss";

export default class TilesLayout implements ILayoutStrategy {
    private placeholders: JSX.Element[];

    constructor() {
        // todo: replace whith grid layout when IE supports it
        const placeHolderKeys = new Array(10).fill(0); 
        this.placeholders = placeHolderKeys.map((_, i) => {
            return <li key={"placeholder" + i} className="user-tiles__placeholder"/>;
        });
    }

    public render(data: any[]) {
        
        return (
                <ul className="user-tiles">
                    {data.map((val: number) => this.renderTile(val, val)).concat(this.placeholders)}
                </ul>);
    }

    private renderTile(key: any, value: any): JSX.Element {
        return <Tile key={key} valueObject={value}/>;
    }
}
  
const Tile = (props: { valueObject: number }): JSX.Element => {
    return <li className="user-tiles__tile">{props.valueObject}</li>;
};
