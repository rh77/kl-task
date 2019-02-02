import React, { Component } from 'react';
import "./SortSwitcher.scss";

interface ISortSetupState {
    field?: string;
    isDescending: boolean;
}

export default class SortSwitcher extends Component<any, ISortSetupState> {

    constructor(props) {
        super(props);

        this.state = {
            field: undefined,
            isDescending: false
        };
    }

    public render() {
        return (
            <div className="sort-switcher">
                    <label className="sort-switcher__label">Sort by:</label>
                    <select className="sort-switcher__select" size={1} onChange={(e) => this.setState({field: e.target.selectedOptions[0].value})}>
                        <option value="">(none)</option>
                        <option value="name">name</option>
                        <option value="group">group</option>
                        <option value="group-name">group, then by name</option>
                    </select>
                    <select className="sort-switcher__select" size={1} disabled={!this.state.field}>
                        <option value="name">ascending</option>
                        <option value="group">descending</option>
                    </select>
                </div>
        );
    }
}
