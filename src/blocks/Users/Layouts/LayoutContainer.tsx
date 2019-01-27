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
}

class LayoutContainer extends Component<ILayoutProps, ILayoutContainerState> {

    private layouts: object = {
        [ViewType.Group]: new GroupsLayoutStrategy(),
        [ViewType.Table]: new TableLayoutStrategy(),
        [ViewType.Tile]: new TilesLayoutStrategy() 
    };

    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            data: UserDataProvider.instance.userData
        };

        UserDataProvider.instance.onDataReady = () => {
            this.setState({
                data: UserDataProvider.instance.userData
            });
        };
    }
    
    public render() {
  
        const layout = this.layouts[this.props.viewType] || new TilesLayoutStrategy();
        return this.renderLayout(layout);
    }

    private renderLayout(layout: ILayoutStrategy): JSX.Element {
        layout.setup(this.state.data, this.props.searchString);
        return (
            <div className="users-container__content-panel">
                {layout.render()}
            </div>
        );
    }
}

export default LayoutContainer;
