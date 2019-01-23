import React from 'react';

export default interface ILayoutStrategy {
    render(data: any[]): JSX.Element;
}
