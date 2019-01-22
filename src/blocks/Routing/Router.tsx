import React, { Component } from 'react';
import { RouterProvider } from './RouterContext';

class Router extends Component<any, { hash: string }> {

    private hashListener: EventListener;

    constructor(props: any) {
        super(props);

        this.state = {
            hash: getHash(),
        };

        this.hashListener = () => {
            this.setState({ hash : getHash() });
        };

        function getHash() {
            return window.location.hash.replace('#', '');
        }
    }

    public render(): JSX.Element {
        return <RouterProvider value={this.state.hash}>{this.props.children}</RouterProvider>;
    }

    public componentDidMount() {
        window.addEventListener("hashchange", this.hashListener);
    }

    public componentWillUnmount() {
        window.removeEventListener("hashchange", this.hashListener);
    }
}

export default Router;
