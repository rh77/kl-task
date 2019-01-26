import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import placeHolderImage from "./img/avatar-placeholder.png";
import "./Tiles.scss";

export default class Tile extends Component<{ valueObject: UserModel }, { loaded: boolean }> {
    private image: HTMLImageElement;

    constructor(props: { valueObject: UserModel }) {
        super(props);

        this.state = {
            loaded: false
        };

        this.image = new Image();
        this.image.onload = () => {
            this.setState({ loaded: true });
        };
        this.image.src = this.props.valueObject.picture;
    }

    public render() {
        const {name, picture, group, groupId, phone} = this.props.valueObject;
        const pictureSrc = this.state.loaded ? picture : placeHolderImage;
        const groupClassName = "user-tile__group" + (groupId === 0 ? " user-tile__group_unmanaged" : "");
        return (
            <li className="user-tiles__tile user-tile">
                <input className="user-tile__check" type="checkbox"/>
                <button className="user-tile__upload-button"/>
                <label className="user-tile__name">{name}</label>
                <img className="user-tile__picture" src={pictureSrc}/>
                <label className={groupClassName}>{group}</label>
                <label className="user-tile__phone">{phone}</label>
            </li>);
    }
}
