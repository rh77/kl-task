import 'babel-polyfill';
import React, { Component } from 'react';
import "reflect-metadata";
import './App.scss';
import Route from './blocks/Routing/Route';
import Router from './blocks/Routing/Router';
import Users from './blocks/Users/Users';
import Welcome from './blocks/Welcome/Welcome';
import UserDataProvider from './model/userDataProvider';

class App extends Component {
  constructor(props) {
    super(props);

    UserDataProvider.instance.requestUsersData("https://api.myjson.com/bins/z1hb8");
  }

  public render(): JSX.Element {
    return (
      <div className="app">
        <header className="app__header">
          <div className="app__link-container">
            <a className="app__link" href="#welcome">Welcome</a>
            <a className="app__link" href="#users">Users</a>
          </div>
        </header>
        <Router>
          <Route path="welcome" showWhenEmpty={true} block={Welcome}/>
          <Route path="users" block={Users}/>
        </Router>
      </div>
    );
  }
}

export default App;