import {RowStatus} from "../../components/rowStatus/rowStatus";

export const homePageDataColumn = [
    {
        title: 'Название тор.точки',
        dataIndex: 'outletName',
    },
    {
        title: 'Дата сделки',
        dataIndex: 'transDate',
    },
    {
        title: 'Стоимость  поставщика',
        dataIndex: 'supplierCostAmount',
    },
    {
        title: 'B рассрочку ',
        dataIndex: 'fullNameBuyers',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        render: (text, record)=> <RowStatus successText={'Успешно'} failedText={'Не успешно'} status={text}/>
    },
]
