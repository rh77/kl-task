import React from 'react';
import "./Table.scss";

interface IHeadingCellProps { 
    fieldName: string; 
    title: string;
    isDescending: boolean;
    isSorted: boolean;
    onClick: (field: string) => void;
}

const HeadingCell = (props: IHeadingCellProps): JSX.Element => {

    const { fieldName, title, isDescending, isSorted, onClick } = props;
    const clickHandler = (e: React.FormEvent<HTMLDivElement>) => onClick(fieldName);

    const headerSortedClass = isSorted ? (" group-header_sorted" + (isDescending ? "_desc" : "_asc")) : "";
    return (
            <div 
                className={"users-table__cell users-table__cell_heading" + headerSortedClass} 
                onClick={clickHandler}
            >
                {title}
            </div>);
};

export default HeadingCell;
