import React, { Component } from 'react';
import UserDataProvider from '../../../model/userDataProvider';
import UserModel from '../../../model/userModel';
import ViewType from "../Enums/ViewType";
import ILayoutTypeProps from '../Props/ILayoutTypeProps';
import GroupsLayoutStrategy from './GroupsLayoutStrategy';
import ILayoutStrategy from './ILayoutStrategy';
import TableLayoutStrategy from './TableLayoutStrategy';
import TilesLayoutStrategy from './TilesLayoutStrategy';

interface ILayoutDataState {
    data: UserModel[];
}

class LayoutContainer extends Component<ILayoutTypeProps, ILayoutDataState> {

    private tableLayout: ILayoutStrategy;
    private groupsLayout: ILayoutStrategy;
    private tilesLayout: ILayoutStrategy;

    constructor(props: ILayoutTypeProps) {
        super(props);

        this.state = {
            data: UserDataProvider.instance.userData
        };

        UserDataProvider.instance.onDataReady = () => {
            this.setState({
                data: UserDataProvider.instance.userData
            });
        };

        this.tableLayout = new TableLayoutStrategy();
        this.groupsLayout = new GroupsLayoutStrategy();
        this.tilesLayout = new TilesLayoutStrategy();
    }
    
    public render() {
  
        switch (this.props.viewType) {   
            case ViewType.Table:
                return this.renderLayout(this.tableLayout);
        
            case ViewType.Group:
                return this.renderLayout(this.groupsLayout);
        
            case ViewType.Tile:
            default:
                return this.renderLayout(this.tilesLayout);
        }
    }

    private renderLayout(layout: ILayoutStrategy): JSX.Element {
        layout.setup(this.state.data);
        return (
            <div className="users-container__content-panel">
                {layout.render()}
            </div>
        );
    }
}

export default LayoutContainer;
