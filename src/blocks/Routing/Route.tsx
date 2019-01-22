import React, { Component } from 'react';
import { RouterConsumer } from './RouterContext';

interface IRouteProps {
    path: string;
    showWhenEmpty?: boolean;
    block: typeof React.Component;
}

class Route extends Component<IRouteProps> {

    public render(): JSX.Element | null {

        const { showWhenEmpty, path, block } = this.props;

        return (
            <RouterConsumer>
                {(hash: string) => (showWhenEmpty && hash === '' || hash === path) ? React.createElement(block) : null} 
            </RouterConsumer>);

    }
}

export default Route;
