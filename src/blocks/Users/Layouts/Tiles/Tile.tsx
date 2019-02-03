import React, { Component } from 'react';
import UserModel from '../../../../model/userModel';
import HighlightedToken from '../Common/HighlightedToken/HighlightedToken';
import { HighlighterFunc } from '../Common/SearchStrategy/ISearchStrategy';
import placeHolderImage from "./img/avatar-placeholder.png";
import "./Tiles.scss";

interface ITileProps {
    userModel: UserModel;
    highlighter: HighlighterFunc;
}

interface ITileState {
    loaded: boolean;
    checked: boolean;
    highlighter: HighlighterFunc;
}

export default class Tile extends Component<ITileProps, ITileState> {
    private image: HTMLImageElement;

    constructor(props: ITileProps) {
        super(props);

        this.state = {          
            checked: false,
            highlighter: props.highlighter,
            loaded: false
        };

        this.image = new Image();
        this.image.onload = () => {
            this.setState({ loaded: true });
        };

        this.image.src = props.userModel.picture;
        this.onCheckedChanged = this.onCheckedChanged.bind(this);
    }

    public componentWillReceiveProps(newProps: ITileProps) {

        if (newProps.highlighter !== this.props.highlighter) {
            this.setState({ highlighter: newProps.highlighter });
        }
    }

    public render() {
        const {name, picture, group, groupId, phone} = this.props.userModel;            
        const highlightedNameTokens = this.state.highlighter(name);
        const highlightedName = highlightedNameTokens.map((token, i) => <HighlightedToken token={token} key={i}/>);
        const pictureSrc = this.state.loaded ? picture : placeHolderImage;
        const groupClassName = "user-tile__group" + (groupId === 0 ? " user-tile__group_unmanaged" : "");
        return (
            <li className={"user-tiles__tile user-tile" + (this.state.checked ? " user-tile_checked" : "")}>
                <label className="user-tile__check-plate">
                    <input 
                        className="user-tile__check" 
                        type="checkbox" 
                        checked={this.state.checked} 
                        onChange={this.onCheckedChanged}
                    />
                </label>
                <button className="user-tile__upload-button"/>
                <label className="user-tile__name">{highlightedName}</label>
                <img className="user-tile__picture" src={pictureSrc}/>
                <label className={groupClassName}>{group}</label>
                <label className="user-tile__phone">{phone}</label>
            </li>);
    }

    private onCheckedChanged(e: React.FormEvent<HTMLDivElement>): boolean {
        this.setState({
            checked: !this.state.checked
        });
        return false;
    }
}
