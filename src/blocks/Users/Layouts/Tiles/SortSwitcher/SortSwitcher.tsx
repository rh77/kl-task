import React, { Component } from 'react';
import "./SortSwitcher.scss";

interface ISortSwitcherState {
    fields: string[];
    isDescending: boolean;
}

interface ISortSwitcherProps {
    onSort: (isDescending: boolean, fields: string[]) => void;
}

export default class SortSwitcher extends Component<ISortSwitcherProps, ISortSwitcherState> {

    constructor(props) {
        super(props);

        this.state = {
            fields: [],
            isDescending: false
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onOrderChange = this.onOrderChange.bind(this);
    }

    public render() {
        return (
            <div className="sort-switcher">
                    <label className="sort-switcher__label">Sort by:</label>
                    <select className="sort-switcher__select" size={1} onChange={this.onFieldChange}>
                        <option value="">(none)</option>
                        <option value="name">name</option>
                        <option value="group">group</option>
                        <option value="group,name">group, name</option>
                    </select>
                    <select 
                        className="sort-switcher__select" 
                        size={1} 
                        disabled={!this.state.fields.length} 
                        onChange={this.onOrderChange}
                    >
                        <option value="false">ascending</option>
                        <option value="true">descending</option>
                    </select>
                </div>
        );
    }

    private onFieldChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const fields = e.target.selectedOptions[0].value.split(',');
        this.setState({ fields });
        const { isDescending } = this.state;
        this.props.onSort(isDescending, fields);
    }

    private onOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const isDescending = e.target.selectedOptions[0].value === "true";
        this.setState({ isDescending });
        const { fields } = this.state;
        this.props.onSort(isDescending, fields);
    }
}
