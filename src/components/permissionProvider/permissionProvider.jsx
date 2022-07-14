import React from 'react';
import jwtDecode from "jwt-decode";
import './permissionProvider.scss'

export const checkAccountRole = (roles) => {
    let hasPermission = false;
    let jwt = localStorage.getItem('auth_token');
    const decode_jwt = jwtDecode(jwt);
    roles.forEach((role) => {
        if (decode_jwt?.auth?.includes(role)) {
            hasPermission = true;
        }
    });
    return hasPermission;
}

export const PermissionProvider = ({roles, children}) => {
    let jwt = localStorage.getItem('auth_token');
    const decode_jwt = jwtDecode(jwt);
    let hasPermission = false;

    roles.forEach((role) => {
        if (decode_jwt?.auth?.includes(role)) {
            hasPermission = true;
        }
    });

    return hasPermission ? children : null;
};

