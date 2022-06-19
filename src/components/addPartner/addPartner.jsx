import React, {useState} from 'react';
import {Button, Drawer} from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import './addPartner.scss';



export const AddPartner = () => {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    };
    const showDrawer = () => {
        setVisible(true);
    };
    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                <PlusCircleOutlined /> Добавить партнера
            </Button>

            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
};