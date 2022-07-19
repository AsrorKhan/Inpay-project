import {RowStatus} from "../../components/rowStatus/rowStatus";
import {DateFormatter} from "../../components/dateFormatter/dateFormatter";
import {CurrencyFormatter} from "../../components/currencyFormatter/currencyFormatter";

export const analysisPageDataColumn = [
    {
        title: 'Название тор.точки',
        dataIndex: 'outletName',
    },
    {
        title: 'Дата сделки',
        dataIndex: 'transDate',
        render: (_, record) => <DateFormatter record={record.transDate}/>
    },
    {
        title: 'Стоимость  поставщика',
        dataIndex: 'supplierCostAmount',
        render: (_, record) => <CurrencyFormatter currency={record.supplierCostAmount}/>
    },
    {
        title: 'B рассрочку ',
        dataIndex: 'fullNameBuyers',
        render: (_, record) => <CurrencyFormatter currency={record.installmentAmount}/>
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        render: (_, record) => <RowStatus successText={'Успешно'} failedText={'Не успешно'} status={record.status}/>
    },
]
