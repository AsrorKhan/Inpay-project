import {ROLE_ADMIN, ROLE_USER} from "../helpers/appConstants";

export const menuLinks = [
    {
        label: 'Главная',
        link: '/',
        permissions: [ROLE_ADMIN]
    },
    {
        label: 'Партнеры',
        link: '/partners',
        permissions: [ROLE_ADMIN]
    },
    {
        label: 'Анализ',
        link: '/analysis',
        permissions: [ROLE_USER]
    }
]

