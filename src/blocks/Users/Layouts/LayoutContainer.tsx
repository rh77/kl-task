import React, { Component } from 'react';
import UserDataProvider from '../../../model/userDataProvider';
import UserModel from '../../../model/userModel';
import ViewType from "../Enums/ViewType";
import ILayoutProps from '../Props/ILayoutProps';
import "../Users.scss";
import ILayoutStrategy from './Common/LayoutStrategy/ILayoutStrategy';
import SimpleLayoutStrategy, { ElementFactoryMethod } from './Common/LayoutStrategy/SimpleLayoutStrategy';
import GroupsLayoutStrategy from './Groups/GroupsLayoutStrategy';
import Table from './Table/Table';
import "./Table/Table.scss";
import Tiles from './Tiles/Tiles';
import "./Tiles/Tiles.scss";

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

        const createTable: ElementFactoryMethod = 
            (users, highlighter) => <Table users={users} highlighter={highlighter}/>;
        const cteateTiles: ElementFactoryMethod =
            (users, highlighter) => <Tiles users={users} highlighter={highlighter}/>;
            
        this.layouts = {
            [ViewType.Group]: new GroupsLayoutStrategy(),
            [ViewType.Table]: new SimpleLayoutStrategy(createTable),
            [ViewType.Tile]: new SimpleLayoutStrategy(cteateTiles) 
        };
    }
    
    public render() {
  
        const layout = this.layouts[this.props.viewType] || this.layouts[ViewType.Tile];
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
