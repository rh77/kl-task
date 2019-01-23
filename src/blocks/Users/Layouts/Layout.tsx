import React, { Component } from 'react';
import ViewType from "../Enums/ViewType";
import IUsersProps from '../Props/IUsersProps';
import './Groups.scss';
import GroupsLayout from './GroupsLayout';
import TableLayout from './TableLayout';
import "./Tiles.scss";
import TilesLayout from './TilesLayout';
import ILayoutStrategy from './ILayoutStrategy';

class Layout extends Component<IUsersProps> {
    private data: number[];
    private tableLayout: TableLayout;
    private groupsLayout: GroupsLayout;
    private tilesLayout: TilesLayout;

    constructor(props: IUsersProps) {
        super(props);

        this.data = [];
        for (let i = 1; i < 9; i++) {
            this.data.push(i);
        }

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
        return (
            <div className="users-container__content-panel">
                {layout.render(this.data)}
            </div>
        );
    }
}

export default Layout;
