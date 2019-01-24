import React, { Component } from 'react';
import UserDataProvider from '../../../userDataProvider';
import ViewType from "../Enums/ViewType";
import ILayoutTypeProps from '../Props/ILayoutTypeProps';
import GroupsLayout from './GroupsLayout';
import ILayoutStrategy from './ILayoutStrategy';
import TableLayout from './TableLayout';
import TilesLayout from './TilesLayout';

interface ILayoutDataState {
    data: any[];
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

        this.tableLayout = new TableLayout();
        this.groupsLayout = new GroupsLayout();
        this.tilesLayout = new TilesLayout();
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
        layout.setup(this.state.data.map(user => user.id));
        return (
            <div className="users-container__content-panel">
                {layout.render()}
            </div>
        );
    }
}

export default LayoutContainer;
