import React, { Component } from "react";
import "./Search.scss";

export interface ISearchProps {
  onSearch: (text: string) => void;
  label: string;
  placeholder: string;
}

export default class Search extends Component<ISearchProps> {
  constructor(props: ISearchProps) {
    super(props);
    
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
        />
      </div>);
  }

  private onSearch(e: React.FormEvent<HTMLInputElement>): void {
    this.props.onSearch((e.target as HTMLInputElement).value);
  }
}
