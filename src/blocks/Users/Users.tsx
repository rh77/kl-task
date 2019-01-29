import React, { Component } from 'react';
import ViewType from "./Enums/ViewType";
import LayoutContainer from "./Layouts/LayoutContainer";
import LayoutSwitcher from "./LayoutSwitcher/LayoutSwitcher";
import ILayoutProps from "./Props/ILayoutProps";
import Search from './Search/Search';
import './Users.scss';

interface ILayoutState {
  viewType: ViewType;
  searchString?: string;
}

class Users extends Component<ILayoutProps, ILayoutState> {
  constructor(props: ILayoutProps) {
    super(props);

    this.state = {
      viewType: ViewType.Tile
    };

    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="users-container">
        <div className="users-container__header-panel">
          <Search onSearch={this.handleSearch} label="Search:" placeholder="user name"/>
          <LayoutSwitcher viewType={this.state.viewType} onSwitch={this.handleSwitch}/>
        </div>
        <LayoutContainer viewType={this.state.viewType} searchString={this.state.searchString}/>
      </div>
    );
  }

  private handleSwitch(clickedType: ViewType): void {
    this.setState({
      viewType: clickedType
    });
  }

  private handleSearch(text: string): void {
    this.setState({
      searchString: text
    });
  }
}

export default Users;
