import React from 'react';
import {Drawer, List, Typography} from "antd";
import './moreInformation.scss'
import {RowStatus} from "../rowStatus/rowStatus";
import {Icon} from "../icon/icon";
import moreInformationHeaderLogo from "../../assets/more-information-header-logo.png";
import {CurrencyFormatter} from "../currencyFormatter/currencyFormatter";
import {DateFormatter} from "../dateFormatter/dateFormatter";

export const MoreInformation = ({moreInformation, visible, onClose}) => {

    return (
        <Drawer visible={visible} onClose={onClose} className='more-information-list'>
            <div className="more-information-list__header-logo">
                <div className="more-information-list__header-logo-merchant-logo"></div>
            </div>
            <div className='more-information-list__title'>
                Название бренда или компании
            </div>

            <List size={'large'}>
                <List.Item className='more-information-list__list-item'>
                    <strong>ФИО покупателя</strong>
                    <span>{moreInformation?.fullNameBuyers}</span>
                </List.Item>
                {/*<List.Item className='more-information-list__list-item'>*/}
                {/*    <strong>Номер телефона</strong>*/}
                {/*    <span>{moreInformation.phoneNumber}</span>*/}
                {/*</List.Item>*/}

                <List.Item className='more-information-list__list-item'>
                    <strong>Дата сделки </strong>
                    <span><DateFormatter record={moreInformation.transDate}/></span>
                </List.Item>
                <List.Item className='more-information-list__list-item'>
                    <strong>Товар</strong>
                    <span><CurrencyFormatter currency={moreInformation.supplierCostAmount}/></span>
                </List.Item>
                <List.Item className='more-information-list__list-item'>
                    <strong>Товар</strong>
                    <span>{moreInformation.productName ? moreInformation.productName : 'Не задано'}</span>
                </List.Item>
                <List.Item className='more-information-list__list-item'>
                    <strong>Цена рассрочки </strong>
                    <span><CurrencyFormatter currency={moreInformation.installmentAmount}/></span>
                </List.Item>
                <List.Item className='more-information-list__list-item-status'>
                    <strong>Статус</strong>
                    <RowStatus status={moreInformation.status} successText='Успешно' failedText='Не успешно'/>
                </List.Item>
            </List>
        </Drawer>
    );
};


// clientFio: 'Alisher Nizamov',
//     product: 'Iphone 13 pro max',
//     merchantName: 'Инвестиционный продукт',
//     dealDate: '02 April 2022',
//     supplierCost: '900000000',
//     forInstallments: '250000000',
//     markup: '10',
//     phoneNumber: '+99833 335 45 87',
//     status: true