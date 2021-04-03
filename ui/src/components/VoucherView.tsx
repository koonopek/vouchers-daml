import React from 'react';
import { Button, Label, List } from "semantic-ui-react";
import CreateWalletModal from './CreateWalletModal';

export interface VoucherProps {
    symbol: string;
    whitelist: string[];
}

export function VoucherView({ symbol, whitelist }: VoucherProps) {

    return (
        <List.Item key={symbol}>
            <List.Icon name='btc' size='large' />
            <List.Content>
                <List.Header >{symbol}</List.Header>
                <List.Description >Whitelist: {whitelist.join(', ')}</List.Description>
            </List.Content>
            <List.Content floated='right'>
                <CreateWalletModal symbol={symbol} />
            </List.Content>
        </List.Item>
    );
}