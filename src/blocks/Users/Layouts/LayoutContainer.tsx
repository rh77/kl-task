import React, { Component } from 'react';
import UserDataProvider from '../../../model/userDataProvider';
import UserModel from '../../../model/userModel';
import ViewType from "../Enums/ViewType";
import ILayoutProps from '../Props/ILayoutProps';
import "../Users.scss";
import GroupsLayoutStrategy from './Groups/GroupsLayoutStrategy';
import ILayoutStrategy from './ILayoutStrategy';
import TableLayoutStrategy from './Table/TableLayoutStrategy';
import TilesLayoutStrategy from './Tiles/TilesLayoutStrategy';

interface ILayoutContainerState {
    data: UserModel[];
    loaded: boolean;
}

class LayoutContainer extends Component<ILayoutProps, ILayoutContainerState> {

    private layouts: object;

    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            data: UserDataProvider.instance.userData,
            loaded: UserDataProvider.instance.userData.length > 0
        };

        UserDataProvider.instance.onUserDataReady = () => {
            this.setState({
                data: UserDataProvider.instance.userData,
                loaded: true
            });
        };

        this.layouts = {
            [ViewType.Group]: new GroupsLayoutStrategy(),
            [ViewType.Table]: new TableLayoutStrategy(),
            [ViewType.Tile]: new TilesLayoutStrategy() 
        };
    }
    
    public render() {
  
        const layout = this.layouts[this.props.viewType] || new TilesLayoutStrategy();
        return this.renderLayout(layout);
    }

    private renderLayout(layout: ILayoutStrategy): JSX.Element {
        layout.setup(this.state.data, this.props.searchString);
        const displayNoneStyle = {
            display: "none"
        };
        return (
            <React.Fragment>
                <div className="users-container__loader" style={this.state.loaded ? displayNoneStyle : {}}>
                    Loading...
                </div>
                <div className="users-container__content-panel" style={this.state.loaded ? {} : displayNoneStyle}>
                    {layout.render()}
                </div>
            </React.Fragment>
        );
    }
}

export default LayoutContainer;
