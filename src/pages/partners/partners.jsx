import React, {useState} from 'react';
import {Col, DatePicker, PageHeader, Row, Select, Table} from "antd";
import PageTitle from "../../components/pageTitle/pageTitle";
import {partnersTableColumns} from "../../helpers/dataTableColumns/partnersTableColumns";
import {partnersTableMockData} from "../../helpers/mockData/partnersTableMockData";
import {Icon} from "../../components/icon/icon";
import iconCalendar from "../../assets/icons/icon-calendar.png";
import {Option} from "antd/es/mentions";
import {AddPartner} from "../../components/addPartner/addPartner";

export const Partners = () => {
    const [viewCountTable, setViewCountTable] = useState(10)

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const changeViewCountTable = (value) => {
        setViewCountTable(value)
    }
    return (
        <Row justify={"center"} className='home-component'>
            <Col span={18}>
                <PageHeader
                    title='Партнеры'
                    extra={[
                        <AddPartner/>
                    ]}
                />
            </Col>
            <Col span={18} style={{padding: 12, backgroundColor: '#fff', borderRadius: 10}}>
                <Table
                    columns={partnersTableColumns}
                    dataSource={partnersTableMockData}
                    rowKey={(r) => r.key}

                    title={() => (
                        <>
                            <DatePicker suffixIcon={<Icon content={iconCalendar}/>} placeholder={'Дата с'}
                                        onChange={onChange}/>
                            <DatePicker suffixIcon={<Icon content={iconCalendar}/>} placeholder={'Дата до'}
                                        onChange={onChange}/>
                            <div className='ant-table__sort-by'>Сортировка: &nbsp;
                                <Select defaultValue='nameMerchant'>
                                    <Option value="nameMerchant">Название точки</Option>
                                    <Option value="addressMerchant">Адрес точки</Option>
                                    <Option value="typeMerchant">Тип точки</Option>
                                </Select>
                            </div>
                            <div className='ant-table__pick-size-table'>Показать: &nbsp;
                                <Select defaultValue="10" onChange={changeViewCountTable}>
                                    <Option value={10}>10</Option>
                                    <Option value={15}>15</Option>
                                    <Option value={20}>20</Option>
                                </Select></div>
                            <div className='ant-table__amounts'>
                                <span className='ant-table__amounts-title'>Итого цена поставщика</span>
                                <span className='ant-table__amounts-amount'>10 000 000 UZS</span>
                            </div>
                            <div className='ant-table__amounts'>
                                <span className='ant-table__amounts-title'>Итого в рассрочку</span>
                                <span className='ant-table__amounts-amount'>23 000 000 UZS</span>
                            </div>
                        </>
                    )}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: viewCountTable
                    }}
                >

                </Table>
            </Col>
        </Row>
    );
};

