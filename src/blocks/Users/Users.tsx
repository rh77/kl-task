import React, { Component } from 'react';
import ViewType from "./Enums/ViewType";
import Layout from "./Layouts/Layout";
import LayoutSwitcher from "./LayoutSwitcher/LayoutSwitcher";
import IUsersProps from "./Props/IUsersProps";
import Search from './Search/Search';
import './Users.scss';

export interface IUsersState {
  viewType: ViewType;
}

class Users extends Component<IUsersProps, IUsersState> {
  constructor(props: IUsersProps) {
    super(props);

    this.state = {
      viewType: ViewType.Tile
    };

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="users-container">
        <div className="users-container__header-panel">
          <Search/>
          <LayoutSwitcher viewType={this.state.viewType} onSwitch={this.handleSwitch}/>
        </div>
        <Layout viewType={this.state.viewType}/>
      </div>
    );
  }

  private handleSwitch(clickedType: ViewType): void {
    this.setState({
      viewType: clickedType
    });
  }
}

export default Users;
