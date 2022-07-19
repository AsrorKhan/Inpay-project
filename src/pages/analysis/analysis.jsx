import React, {useState, useEffect} from 'react';
import {Col, DatePicker, Row, Select, Table} from "antd";
import PageTitle from "../../components/pageTitle/pageTitle";
import {MoreInformation} from "../../components/moreInformation/moreInformation";
import {analysisPageDataColumn} from "../../helpers/dataTableColumns/analysisTableColumns";
import {Icon} from "../../components/icon/icon";
import iconCalendar from "../../assets/icons/icon-calendar.png";
import {Option} from "antd/es/mentions";
import './analysis.scss'
import HeaderComponent from "../../components/header/headerComponent";
import {useDispatch, useSelector} from "react-redux";
import analysisService from "../../services/analysisService";
import {setAnalysis} from "../../store/reducer/analysis";

export const Analysis = () => {
    const [viewCountTable, setViewCountTable] = useState(10);
    const [rowMoreInformation, setRowMoreInformation] = useState({});
    const [visibleChangeInformation, setVisibleChangeInformation] = useState(false);
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
        setVisibleChangeInformation(false);
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
            <Row justify={"center"} className='home-component analysis-component'>
                <Col style={{textAlign: "left"}} span={18}>
                    <PageTitle label={'Анализ'}/>
                </Col>

                <Col span={18}>
                    <div className="analysis-component__header-results">
                        <div className="analysis-component__header-results__sales">
                            <h2 className='analysis-component__header-results__sales__title'>1 000 000 000</h2>
                            <span
                                className='analysis-component__header-results__sales__subtitle'>Кол-во партнеров</span>
                        </div>
                        <div className="analysis-component__header-results__purchase">
                            <h2 className='analysis-component__header-results__purchase__title'>10 000 000 000 000
                                000 </h2>
                            <span className='analysis-component__header-results__purchase__subtitle'>Итого цена поставщика</span>
                        </div>
                        <div className="analysis-component__header-results__return">
                            <h2 className='analysis-component__header-results__sales__title'>20 000 000 000 000 </h2>
                            <span
                                className='analysis-component__header-results__return__subtitle'>Итого в рассрочку</span>
                        </div>
                    </div>
                </Col>
                <Col span={18} style={{padding: 12, backgroundColor: '#fff', borderRadius: 10}}>
                    <MoreInformation
                        onClose={onCloseMoreInformation}
                        moreInformation={rowMoreInformation}
                        visible={visibleChangeInformation}
                    />
                    <Table
                        columns={analysisPageDataColumn}
                        dataSource={analysisList.content}
                        rowKey={(r) => r.key}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setVisibleChangeInformation(true)
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

