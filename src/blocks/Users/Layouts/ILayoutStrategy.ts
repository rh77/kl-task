import React from 'react';

export default interface ILayoutStrategy {

    render(): JSX.Element;

    setup(data: any[]): void;
}
