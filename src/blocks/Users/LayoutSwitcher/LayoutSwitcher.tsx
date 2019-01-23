import React, { Component } from 'react';
import ViewType from "../Enums/ViewType";
import IUsersProps from "../Props/IUsersProps";
import "./LayoutSwitcher.scss";

export interface ISwitcherProps extends IUsersProps {
    onSwitch: (viewType: ViewType) => void;
}
  
export default class LayoutSwitcher extends Component<ISwitcherProps> {

    private static getButtonClassName(type: string, isActive: boolean): string {
        return `switcher__button switcher__button_type_${type} ${isActive ? "switcher__button_active" : ""}`;
    }

    private static handleClick(onSwitch: (viewType: ViewType) => void, viewType: ViewType) {
        onSwitch(viewType);
    }

    private handleGroupClick: () => void;
    private handleTileClick: () => void;
    private handleTableClick: () => void;

    constructor(props: ISwitcherProps) {
        super(props);

        this.handleGroupClick = LayoutSwitcher.handleClick.bind(null, this.props.onSwitch, ViewType.Group);
        this.handleTileClick = LayoutSwitcher.handleClick.bind(null, this.props.onSwitch, ViewType.Tile);
        this.handleTableClick = LayoutSwitcher.handleClick.bind(null, this.props.onSwitch, ViewType.Table);
    }

    public render() {
        return (
        <div className="switcher">
            <div 
                className={LayoutSwitcher.getButtonClassName("group", this.props.viewType === ViewType.Group)} 
                onClick={this.handleGroupClick}
            />
            <div 
                className={LayoutSwitcher.getButtonClassName("tile", this.props.viewType === ViewType.Tile)} 
                onClick={this.handleTileClick}
            />
            <div 
                className={LayoutSwitcher.getButtonClassName("table", this.props.viewType === ViewType.Table)} 
                onClick={this.handleTableClick}
            />
        </div>);
    }
}
