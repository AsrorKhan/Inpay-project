import React, {useState, useEffect} from 'react';
import {Col, DatePicker,  Row, Select, Table,} from "antd";
// import {homePageDataColumn} from "../../helpers/dataTableColumns/homeTableColumns";
import {analysisPageDataColumn} from "../../helpers/dataTableColumns/analysisTableColumns";
import PageTitle from "../../components/pageTitle/pageTitle";
import {Option} from "antd/es/mentions";
import {Icon} from "../../components/icon/icon";
import iconCalendar from '../../assets/icons/icon-calendar.png'
import {MoreInformation} from "../../components/moreInformation/moreInformation";
import HeaderComponent from "../../components/header/headerComponent";
import {useDispatch, useSelector} from "react-redux";
import analysisService from "../../services/analysisService";
import {setAnalysis} from "../../store/reducer/analysis";

export const Home = () => {
    const [viewCountTable, setViewCountTable] = useState(10);
    const [rowMoreInformation, setRowMoreInformation] = useState({})
    const [visibleMoreInformation, setVisibleMoreInformation] = useState(false)
    const analysisList = useSelector(state => state.analysis)
    const dispatch = useDispatch();
    useEffect(() => {
        analysisService.loadAnalysisList()
            .then((response) => {
                dispatch(setAnalysis({
                    content: response.data
                }))
            })
            .catch((e) => console.log("catch: ", e));
    }, [])

    const onCloseMoreInformation = () => {
        setVisibleMoreInformation(false);
    };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const changeViewCountTable = (value) => {
        setViewCountTable(value)
    }
    return (
        <>
            <HeaderComponent/>
            <Row justify={"center"} className='home-component'>
                <Col style={{textAlign: "left"}} span={18}>
                    <PageTitle label={'Информация за текущий день'}/>
                </Col>


                <Col span={18} style={{padding: 12, backgroundColor: '#fff', borderRadius: 10}}>
                    <MoreInformation
                        onClose={onCloseMoreInformation}
                        moreInformation={rowMoreInformation}
                        visible={visibleMoreInformation}
                    />
                    <Table
                        columns={analysisPageDataColumn}
                        dataSource={analysisList.content}
                        rowKey={(r) => r.id}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setVisibleMoreInformation(true)
                                    setRowMoreInformation(record)
                                }
                            }
                        }}
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
                                    <span className='ant-table__amounts-amount'>10 000 000 000 000 000 000 UZS</span>
                                </div>
                                <div className='ant-table__amounts'>
                                    <span className='ant-table__amounts-title'>Итого в рассрочку</span>
                                    <span className='ant-table__amounts-amount'>23 000 000 000 000 000 000 UZS</span>
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
        </>
    );
};
