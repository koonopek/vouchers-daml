import React from 'react';
import { Button, Icon, Label, List } from "semantic-ui-react";
import { Voucher } from '@daml.js/daml-vouchers';
import SendVoucherModal from './SendVoucherModal';
import { useParty } from '@daml/react';
import { useAutoAcceptTransferApproval } from './useAutoAccept';
import { ContractId } from '@daml/types';

export type WalletProps = Pick<Voucher.VoucherBalance, 'asset' | 'balance'> & {voucherBalanceId: ContractId<Voucher.VoucherBalance>};

export function WalletView({ asset, balance, voucherBalanceId }: WalletProps) {
    useAutoAcceptTransferApproval(voucherBalanceId);
    const party = useParty();

    return (
        <List.Item key={asset.symbol}>
            <List.Content>
                <List.Header> {asset.symbol.toUpperCase()}
                    <Label style={{ marginLeft: '5px' }}>
                        <Icon name='money' />{balance}
                    </Label>
                </List.Header>
            </List.Content>
            <List.Content floated='right'>
                <SendVoucherModal owner={party} symbol={asset.symbol} assetOwner={asset.owner}/>
                <Button>Receive</Button>
            </List.Content>
        </List.Item>
    );
}