import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import placeHolderImage from "./img/avatar-placeholder.png";
import "./Tiles.scss";

export default class Tile extends Component<{ userModel: UserModel }, { loaded: boolean, checked: boolean }> {
    private image: HTMLImageElement;

    constructor(props: { userModel: UserModel }) {
        super(props);

        this.state = {          
            checked: false,
            loaded: false
        };

        this.image = new Image();
        this.image.onload = () => {
            this.setState({ loaded: true });
        };

        this.image.src = this.props.userModel.picture;
        this.onCheckedChanged = this.onCheckedChanged.bind(this);
    }

    public render() {
        const {name, picture, group, groupId, phone} = this.props.userModel;
        const pictureSrc = this.state.loaded ? picture : placeHolderImage;
        const groupClassName = "user-tile__group" + (groupId === 0 ? " user-tile__group_unmanaged" : "");
        return (
            <li className="user-tiles__tile user-tile">
                <div className="user-tile__check-plate" onClick={this.onCheckedChanged}>
                    <input 
                        className="user-tile__check" 
                        type="checkbox" 
                        checked={this.state.checked} 
                        onChange={this.onCheckedChanged}
                    />
                </div>
                <button className="user-tile__upload-button"/>
                <label className="user-tile__name">{name}</label>
                <img className="user-tile__picture" src={pictureSrc}/>
                <label className={groupClassName}>{group}</label>
                <label className="user-tile__phone">{phone}</label>
            </li>);
    }

    private onCheckedChanged(e: React.FormEvent<HTMLDivElement>): boolean {
        this.setState({
            checked: !this.state.checked,
            loaded: this.state.loaded
        });
        return false;
    }
}
