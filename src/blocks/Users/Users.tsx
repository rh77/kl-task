import React, { Component } from 'react';
import './Users.scss';

export enum ViewType { Default=0, Group=1, Tile=2, Table=3 };

export interface IUsersProps {
  viewType: ViewType;
}

export interface IUsersState {
  viewType: ViewType;
}

class Users extends Component<IUsersProps, IUsersState> {
  constructor(props: IUsersProps) {
    super(props);

    this.state = {
      viewType: ViewType.Tile
    }
  }

  public render(): JSX.Element {
    const data = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div className="users-header">
        <div className="users-header__panel">
          <div className="users-header__search"><Search/></div>
          <div className="users-header__layout-switcher"><Switcher viewType={this.state.viewType} onClick={this.handleClick}/></div>
        </div>
        <div className="users-table">
        {data.map((val: number) => <Line key={val} valueObject={val} isUnmanaged={val === 5 || val === 6}/>)}
        </div>
      </div>
    );
  }

  private handleClick = (clickedType: ViewType): void => {
    this.setState({
      viewType: clickedType
    });
  }
}

const Line = (props: { valueObject: number, isUnmanaged: boolean}): JSX.Element => {
  const classes = 
        "users-table__cell " 
         + (props.isUnmanaged ? "users-table__cell_unmanaged" : "");
  const line = <div className={classes}>{props.valueObject}</div>;
  return line;
};

const Search = (): JSX.Element => {
  return (
      <div className="search">
        <label className="search__label">Search:</label><input className="search__input" type="search" placeholder="text" />
      </div>);
};

const Switcher = (props: { viewType: ViewType, onClick: any }): JSX.Element => {
  return (
    <div className="switcher">
      <div className={getClassName("group", props.viewType === ViewType.Group )} onClick={() => props.onClick(ViewType.Group)}/>
      <div className={getClassName("tile", props.viewType === ViewType.Tile )} onClick={() => props.onClick(ViewType.Tile)}/>
      <div className={getClassName("table", props.viewType === ViewType.Table )} onClick={() => props.onClick(ViewType.Table)}/>
    </div>);

  function getClassName(type: string, isActive: boolean): string {
    return `switcher__button switcher__button_type_${type} ${isActive ? "switcher__button_active" : ""}`;
  }
};

export default Users;
