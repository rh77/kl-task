import React, { Component } from 'react';
import Clock from './Clock';
import "./Welcome.scss";

export default class Welcome extends Component<any, { time: Date }> {

    public render(): JSX.Element {
        return (
            <div className="welcome-container">
                <div className="welcome-text">
                    Welcome to my React app!<br/><br/>Please, navigate to [Users] menu above to see users.
                </div>
                <Clock/>
            </div>
        );
    }
}
