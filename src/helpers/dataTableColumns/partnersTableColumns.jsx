import {SwitcherActivator} from "../../components/switcherActivator/switcherActivator";
import {RecoverPasswordModal} from "../../components/recoverPasswordModal/recoverPasswordModal";

export const partnersTableColumns = [
    {
        title: 'партнеры',
        dataIndex: 'firstName',
    },
    {
        title: 'Номер тел',
        dataIndex: 'login',
    },
    {
        title: 'Статус',
        dataIndex: 'activated',
        render: (text, record) => <SwitcherActivator status={text}/>
    },
    {
        title: 'Забыли пароль',
        dataIndex: '',
        render: (text, record) => <RecoverPasswordModal />
    },
]
