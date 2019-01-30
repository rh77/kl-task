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

        UserDataProvider.instance.requestUsersData("https://api.myjson.com/bins/sz7d4");
        this.routeChangeHandler = this.routeChangeHandler.bind(this);
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
                <Router onRouteChange={this.routeChangeHandler} default="welcome">
                    <Route path="welcome" block={Welcome}/>
                    <Route path="users" block={Users}/>
                </Router>
            </div>
        );
    }

    private routeChangeHandler(route: string): void {
        const activeModifierName = "app__link_active";
        document.querySelectorAll(".app__link")
            .forEach((el: Element) => el.classList.remove(activeModifierName));
        document.querySelectorAll(`a[href='#${route}']`)
            .forEach((el: Element) => el.classList.add(activeModifierName));
    }
}

export default App;
