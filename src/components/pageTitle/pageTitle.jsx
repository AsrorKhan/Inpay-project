import React from 'react';
import './pageTitle.scss'
const PageTitle = ({label}) => {
    return (
        <h1 className={'page-title'}>
            {label}
        </h1>
    );
};

export default PageTitle;