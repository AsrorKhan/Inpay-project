import React from 'react';
import {Button, Col, PageHeader, Row, Space, Table} from "antd";
import {mainPageDataColumn} from "../../helpers/dataTableColumns/mainTableColumns";
import {mainTableMockData, MainTableMockData} from "../../helpers/mockData/mainTableMockData";

export const Home = () => {
    return (
        <Row justify={"center"} style={{background: '#fff'}} className='home-component'>
            <Col span={18}>
                <div className="site-page-header-ghost-wrapper">
                    <PageHeader
                        ghost={false}
                        // onBack={() => window.history.back()}
                        title="Информация за текущий день"
                        // subTitle="This is a subtitle"
                        // extra={[
                        //     <Button key="3">Operation</Button>,
                        //     <Button key="2">Operation</Button>,
                        //     <Button key="1" type="primary">
                        //         Primary
                        //     </Button>,
                        // ]}
                    >
                        <Table
                            columns={mainPageDataColumn}
                            dataSource={mainTableMockData}
                            rowKey={(r) => r.key}
                        >

                        </Table>
                    </PageHeader>
                </div>
            </Col>
        </Row>
    );
};
