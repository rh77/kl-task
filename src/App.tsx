import React, { Component } from 'react';
import './App.scss';
import Route from './blocks/Routing/Route';
import Router from './blocks/Routing/Router';
import Users from './blocks/Users/Users';
import Welcome from './blocks/Welcome/Welcome';

class App extends Component {
  public render(): JSX.Element {
    return (
      <div className="app">
        <header className="app__header">
          <div className="app__link-container">
            <a className="app__link" href="#welcome">Welcome</a>
            <a className="app__link" href="#users">Users list</a>
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
