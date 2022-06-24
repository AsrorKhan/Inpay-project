import {SwitcherActivator} from "../../components/switcherActivator/switcherActivator";
import {RecoverPassword} from "../../components/recoverPassword/recoverPassword";

export const partnersTableColumns = [
    {
        title: 'партнеры',
        dataIndex: 'partners',
        key: 'partners'
    },
    {
        title: 'Номер тел',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: '',
        render: (text, record) => <SwitcherActivator status={text}/>
    },
    {
        title: 'Забыли пароль',
        dataIndex: 'restorePassword',
        key: 'restorePassword',
        render: (text, record) => <RecoverPassword />
    },
]
