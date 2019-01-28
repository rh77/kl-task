import React from 'react';
import UserModel from '../../../../model/userModel';
import CaseInsensitiveSearchStrategy from '../CaseInsensitiveSearchStrategy';
import ILayoutStrategy from '../ILayoutStrategy';
import ISearchStrategy from '../ISearchStrategy';
import Table from './Table';
import "./Table.scss";

export default class TableLayoutStrategy implements ILayoutStrategy {
    private users: UserModel[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();

    public setup(users: UserModel[], searchString?: string) {
        if (!searchString) {
            this.users = users;
            return;
        }

        this.users = users.filter((user) => this.searchStrategy.tryFind(user.name, searchString));      
    }

    public render() {
        return <Table users={this.users}/>;
    }
}
