import React, { Component } from 'react';
import './App.scss';
import Route from './blocks/Routing/Route';
import Router from './blocks/Routing/Router';
import Users from './blocks/Users';
import Welcome from './blocks/Welcome';
import logo from './logo.svg';

class App extends Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Router>
          <Route path="welcome" block={Welcome}/>
          <Route path="users" block={Users}/>
        </Router>
      </div>
    );
  }
}

export default App;
