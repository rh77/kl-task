import React from 'react';
import { IHighlightToken } from '../ISearchStrategy';
import "./HighlightedToken.scss";

const HighlightedToken = (props: {token: IHighlightToken}): JSX.Element => {
    const token = props.token;
    if (token.isHighlighted) {
        return <mark className="search-highlight">{token.text}</mark>;
    } else {
        return <React.Fragment>{token.text}</React.Fragment>;
    }
};

export default HighlightedToken;
