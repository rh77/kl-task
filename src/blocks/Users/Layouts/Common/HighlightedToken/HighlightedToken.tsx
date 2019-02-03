import React from 'react';
import "./HighlightedToken.scss";
import IHighlightToken from './IHighlightToken';

const HighlightedToken = (props: {token: IHighlightToken}): JSX.Element => {
    const token = props.token;
    if (token.isHighlighted) {
        return <mark className="search-highlight">{token.text}</mark>;
    } else {
        return <React.Fragment>{token.text}</React.Fragment>;
    }
};

export default HighlightedToken;
