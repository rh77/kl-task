import React, { Component } from 'react';
import ViewType from "./Enums/ViewType";
import LayoutContainer from "./Layouts/LayoutContainer";
import LayoutSwitcher from "./LayoutSwitcher/LayoutSwitcher";
import ILayoutTypeProps from "./Props/ILayoutTypeProps";
import Search from './Search/Search';
import './Users.scss';

interface ILayoutTypeState {
  viewType: ViewType;
}

class Users extends Component<ILayoutTypeProps, ILayoutTypeState> {
  constructor(props: ILayoutTypeProps) {
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
        <LayoutContainer viewType={this.state.viewType}/>
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
