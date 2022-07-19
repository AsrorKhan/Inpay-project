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
        title: '% вставка',
        dataIndex: 'percent',
        render: (_, record) => <>{record.percent ? `${record.percent} %` : '0 %'}</>
    },
    {
        title: 'Статус',
        dataIndex: 'activated',
        render: (text, record) => <><SwitcherActivator activated={text}/></>
    },
    {
        title: 'Забыли пароль',
        dataIndex: '',
        render: (_, record) => <RecoverPasswordModal userLogin={record?.login}/>
    },
]
