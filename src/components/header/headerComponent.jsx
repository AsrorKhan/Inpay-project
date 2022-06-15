import React from 'react';
import {menuLinks} from "../../constants/menuLinks";
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <>
            {menuLinks.map((item) => {
                    return (
                        <Link to={item.link} key={item.link}>{item.label}</Link>
                    )
                }
            )}
        </>
    );
};

export default HeaderComponent;
