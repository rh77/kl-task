import React from 'react';
import { IHighlightToken } from '../ISearchStrategy';
import "./HighlightedToken.scss";

const HighlightedToken = (props: {token: IHighlightToken}): JSX.Element => {
    const token = props.token;
    return <span>{token.isHighlighted ? <mark className="search-highlight">{token.text}</mark> : token.text}</span>;
};

export default HighlightedToken;
