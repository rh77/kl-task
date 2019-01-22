import React, { Component } from 'react';
import './Users.scss';

interface IUsersProps {}

class Users extends Component<IUsersProps> {
  public render(): JSX.Element {
    const data = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div>
        <div>User list</div>
        <div className="users-table">
        {data.map((val: number) => <Line key={val} valueObject={val} isUnmanaged={val === 5 || val === 6}/>)}
        </div>
      </div>
    );
  }
}

const Line = (props: { valueObject: number, isUnmanaged: boolean}) => {

  const classes = 
        "users-table__cell " 
         + (props.isUnmanaged ? "users-table__cell_unmanaged" : "");
  const line = <div className={classes}>{props.valueObject}</div>;
  return line;
};

export default Users;
