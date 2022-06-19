import {RowStatus} from "../../components/rowStatus/rowStatus";

export const homePageDataColumn = [
    {
        title: 'Название тор.точки',
        dataIndex: 'merchantName',
        key: 'merchantName'
    },
    {
        title: 'Дата сделки',
        dataIndex: 'dealDate',
        key: 'dealDate'
    },
    {
        title: 'Стоимость  поставщика',
        dataIndex: 'supplierCost',
        key: 'supplierCost'
    },
    {
        title: 'B рассрочку ',
        dataIndex: 'forInstallments',
        key: 'forInstallments'
    },
    {
        title: '% наценки',
        dataIndex: 'markup',
        key: 'markup'
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: '',
        render: (text, record)=> <RowStatus successText={'Успещно'} failedText={'Не успешно'} status={text}/>
    },
]