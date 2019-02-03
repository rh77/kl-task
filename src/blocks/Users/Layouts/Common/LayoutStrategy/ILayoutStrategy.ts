import React from 'react';
import UserModel from '../../../../../model/userModel';

export default interface ILayoutStrategy {

    render(): JSX.Element;

    setup(data: UserModel[], searchString?: string): void;
}
