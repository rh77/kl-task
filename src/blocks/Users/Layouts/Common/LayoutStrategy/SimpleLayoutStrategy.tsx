import React from 'react';
import UserModel from '../../../../../model/userModel';
import ILayoutStrategy from '../../Common/LayoutStrategy/ILayoutStrategy';
import CaseInsensitiveSearchStrategy from '../../Common/SearchStrategy/CaseInsensitiveSearchStrategy';
import ISearchStrategy, { HighlighterFunc } from '../../Common/SearchStrategy/ISearchStrategy';

export type ElementFactoryMethod = (users: UserModel[], highlighter: HighlighterFunc) => JSX.Element;

export default class SimpleLayoutStrategy implements ILayoutStrategy {
    private users: UserModel[] = [];
    private searchStrategy: ISearchStrategy = new CaseInsensitiveSearchStrategy();
    private elementFactoryMethod: ElementFactoryMethod;

    constructor(elementFactoryMethod: ElementFactoryMethod) {
        this.elementFactoryMethod = elementFactoryMethod;
    }

    public setup(users: UserModel[], searchString?: string) {

        this.searchStrategy.setTargetText(searchString);

        if (!searchString) {
            this.users = users;
            return;
        }

        this.users = users.filter((user) => this.searchStrategy.tryFind(user.name));  
    }

    public render() {
        
        const highlighter = this.searchStrategy.getHighlighterFunction();
        return this.elementFactoryMethod(this.users.slice(), highlighter);
    }
}
