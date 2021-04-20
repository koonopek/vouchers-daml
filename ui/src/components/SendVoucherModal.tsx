import { useLedger } from '@daml/react';
import React from 'react';
import { Button, Form, Header, Modal, Segment } from 'semantic-ui-react';
import { Voucher } from '@daml.js/daml-vouchers';
import { useAlert } from 'react-alert';


export type SendVoucherProps = {
    owner: string;
    symbol: string
    assetOwner: string;
}

function SendVoucherModal({ owner, symbol, assetOwner }: SendVoucherProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const [receiver, setreceiver] = React.useState('');
    const [amount, setAmount] = React.useState('0');

    const ledger = useLedger();
    const alert = useAlert();

    const transferVoucher = () => {
        ledger.exerciseByKey(
            Voucher.VoucherBalance.Transfer,
            { _1: owner, _2: symbol, _3: assetOwner },
            { amount, receiver }
        )
        .then(() => alert.success(`Successfully sent voucher to ${receiver}`))
        .catch(() => alert.error(`Failed to sent voucher to ${receiver}`))
        setOpen(false);
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button positive>Send</Button>}>
            <Modal.Header>Transfer voucher</Modal.Header>
            <Modal.Content >
                <Modal.Description>
                    <Header>Transfer settings</Header>
                    <Form size='large' className='test-select-login-screen'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='abc'
                                value={receiver}
                                className='test-select-username-field'
                                onChange={e => setreceiver(e.currentTarget.value)}
                            />
                            <Form.Input
                                fluid
                                icon='money'
                                iconPosition='left'
                                placeholder='0'
                                value={amount}
                                className='test-select-amount-field'
                                onChange={e => setAmount(e.currentTarget.value)}
                            />
                        </Segment>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Send voucher"
                    labelPosition='right'
                    icon='rocket'
                    onClick={transferVoucher}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}


export default SendVoucherModal;