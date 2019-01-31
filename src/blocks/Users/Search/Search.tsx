import React, { Component } from "react";
import "./Search.scss";

export interface ISearchProps {
    onSearch: (text: string) => void;
    label: string;
    placeholder: string;
}

export default class Search extends Component<ISearchProps> {
    private throttledSearch: (text: string) => void;

    constructor(props: ISearchProps) {
        super(props);
        
        this.throttledSearch = Search.getThrottled(props.onSearch, 300);
        this.onSearch = this.onSearch.bind(this);
    }

    public render() {
        return (
            <div className="search">
                <label className="search__label">{this.props.label}</label>
                <input 
                    className="search__input"
                    type="search" 
                    placeholder={this.props.placeholder} 
                    onInput={this.onSearch} 
                    autoFocus={true}
                />
            </div>);
    }

    private onSearch(e: React.FormEvent<HTMLInputElement>): void {
        const text = (e.target as HTMLInputElement).value;
        this.throttledSearch(text);
    }

    private static getThrottled(fn: (text: string) => void, timeout: number)
        : (text: string) => void {

        let isWaiting: boolean = false;
        let capturedText: string = "";
        let isTextUpdated: boolean = false;

        const throttled = (text: string) => {
          
            if (isWaiting) {
                capturedText = text;
                isTextUpdated = true;
                return;
            }

            fn(text);

            isWaiting = true;

            setTimeout(() => {

                isWaiting = false;

                if (!isTextUpdated) {
                    return;
                }

                throttled(capturedText);
                capturedText = "";
                isTextUpdated = false;

            }, timeout);
        };

        return throttled;
    }
}
