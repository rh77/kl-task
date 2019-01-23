import React, { Component } from 'react';
import './Users.scss';

export enum ViewType { Default= 0, Group= 1, Tile= 2, Table= 3 }

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
    };
  }

  public render(): JSX.Element {
    return (
      <div className="users-container">
        <div className="users-container__header-panel">
          <Search/>
          <Switcher viewType={this.state.viewType} onClick={this.handleClick}/>
        </div>
        <UsersLayout viewType={this.state.viewType}/>
      </div>
    );
  }

  private handleClick = (clickedType: ViewType): void => {
    this.setState({
      viewType: clickedType
    });
  }
}

const UsersLayout = (props: { viewType: ViewType }): JSX.Element => {

  const data: number[] = [];
  for (let i = 1; i < 9; i++) {
    data.push(i);
  }

  switch (props.viewType) {

    case ViewType.Table:
      return (
        <div className="users-container__content-panel users-table">
          {data.map((val: number) => <Line key={val} valueObject={val} isUnmanaged={val === 5 || val === 6}/>)}
        </div>);

    case ViewType.Group:
        return (
          <div className="users-container__content-panel">
            <ul className="user-groups">
              {data.map((val: number) => <Group key={val} valueObject={val}/>)}
            </ul>
          </div>);

    case ViewType.Tile:
    default:
      // todo: replace whith grid layout when IE supports it
      const placeHolders = new Array(10).fill(0); 
      return (
            <div className="users-container__content-panel">
              <ul className="user-tiles">
                {data.map((val: number) => <Tile key={val} valueObject={val}/>)
                .concat(placeHolders.map((_, i) => <li key={i} className="user-tiles__placeholder"/>))}
              </ul>
            </div>);
  }
};

const Group = (props: { valueObject: number }): JSX.Element => {
  return <li className="user-groups__group">{props.valueObject}</li>;
};

const Tile = (props: { valueObject: number }): JSX.Element => {
  return <li className="user-tiles__tile">{props.valueObject}</li>;
};

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
        <label className="search__label">Search:</label>
        <input className="search__input" type="search" placeholder="text" />
      </div>);
};

const Switcher = (props: { viewType: ViewType, onClick: any }): JSX.Element => {
  return (
    <div className="switcher">
      <div 
        className={getClassName("group", props.viewType === ViewType.Group)} 
        onClick={() => props.onClick(ViewType.Group)}
      />
      <div 
        className={getClassName("tile", props.viewType === ViewType.Tile)} 
        onClick={() => props.onClick(ViewType.Tile)}
      />
      <div 
        className={getClassName("table", props.viewType === ViewType.Table)} 
        onClick={() => props.onClick(ViewType.Table)}
      />
    </div>);

  function getClassName(type: string, isActive: boolean): string {
    return `switcher__button switcher__button_type_${type} ${isActive ? "switcher__button_active" : ""}`;
  }
};

export default Users;
