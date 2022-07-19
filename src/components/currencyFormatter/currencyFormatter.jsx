import React from 'react';
import CurrencyFormat from 'react-currency-format';
export const CurrencyFormatter = ({currency}) => {
    const value = currency / 100;
    return (
        <>
            <CurrencyFormat
                displayType={'text'}
                value={value}
                thousandSeparator={' '}
            />&nbsp; UZS
        </>
    );
};