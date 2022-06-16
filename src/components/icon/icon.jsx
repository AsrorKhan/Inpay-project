import React from 'react';

export const Icon = ({content, alt, classname, styles}) => {
    return (
        <img className={classname} src={content} alt={alt} style={{...styles}}/>
    );
};

