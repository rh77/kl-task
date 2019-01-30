import React, { Component } from 'react';
import { RouterProvider } from './RouterContext';

class Router extends Component<{ onRouteChange?: (route: string) => void, default: string }, { hash: string }> {

    private hashListener: () => void;

    constructor(props: any) {
        super(props);

        this.state = {
            hash: getHash(),
        };

        this.hashListener = () => {
            let hash = getHash();
            if (!hash || hash.length === 0) {
                hash = props.default;
            }
            this.setState({ hash });
            if (props.onRouteChange) {
                props.onRouteChange(hash);
            }
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
        this.hashListener();
    }

    public componentWillUnmount() {
        window.removeEventListener("hashchange", this.hashListener);
    }
}

export default Router;
