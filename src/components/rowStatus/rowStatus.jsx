import React from 'react';
import './rowStatus.scss'
export const RowStatus = ({status, failedText, successText}) => {
    if (status) {
        return <div className='row-status__success'>{successText}</div>
    }
    return <div className='row-status__failed'>{failedText}</div>
};

