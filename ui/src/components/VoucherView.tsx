import React from 'react';
import { Label, List } from "semantic-ui-react";

export interface VoucherProps {
    symbol: string;
    whitelist: string[];
}

export function VoucherView({symbol, whitelist}: VoucherProps) {

    return (
    <List.Item>
        <List.Icon name='btc' circular size='large' verticalAlign='middle' />
        <List.Content>
            <List.Header as='a'>{symbol}</List.Header>
            <List.Description as='a'>{whitelist.map(partie => <Label>{partie}</Label>)}</List.Description>
        </List.Content>
    </List.Item>
    );
}