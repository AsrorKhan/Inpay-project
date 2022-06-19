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
        render: (text, record) => console.log(record)
    },
    {
        title: 'Забыли пароль',
        dataIndex: 'restorePassword',
        key: 'restorePassword'
    },
]
