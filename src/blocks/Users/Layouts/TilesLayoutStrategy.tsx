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

    const {name, picture, group, groupId, phone} = props.valueObject;
    const groupClassName = "user-tile__group" + (groupId === 0 ? " user-tile__group_unmanaged" : "");
    return (
        <li className="user-tiles__tile user-tile">
            <input className="user-tile__check" type="checkbox"/>
            <button className="user-tile__upload-button"/>
            <label className="user-tile__name">{name}</label>
            <img className="user-tile__picture" src={picture}/>
            <label className={groupClassName}>{group}</label>
            <label className="user-tile__phone">{phone}</label>
        </li>);
};
