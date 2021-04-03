import { Voucher } from '@daml.js/daml-vouchers';
import { useLedger, useParty } from '@daml/react';
import React from 'react';
import { useAlert } from 'react-alert';
import { Button, Form, Header, Label, Modal, Segment } from 'semantic-ui-react';


function CreateVoucherModal() {
    const [open, setOpen] = React.useState<boolean>(false)
    const [symbol, setSymbol] = React.useState('');
    const username = useParty();
    const ledger = useLedger();
    const alert = useAlert();

    const [whitelist, setWhitelist] = React.useState<string[]>([]);
    const [newPartie, setNewPartie] = React.useState<string>('');

    const createVoucher = () => {
        if (symbol === '' || whitelist === []) return;

        ledger.create(Voucher.Voucher, { owner: username, symbol, whitelist })
            .then(() => alert.success(`Successfully created voucher ${symbol}`))
            .catch(() => alert.error(`Failed to create voucher ${symbol}`))
        setOpen(false);
    }

    const addToWhitelist = () => {
        if (!whitelist.includes(newPartie) || newPartie === '') {
            setWhitelist([...whitelist, newPartie]);
            setNewPartie('');
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create voucher</Button>}>
            <Modal.Header>Create new voucher</Modal.Header>
            <Modal.Content >
                <Modal.Description>
                    <Header>Voucher settings</Header>
                    <Form size='large' className='test-select-login-screen'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='money'
                                iconPosition='left'
                                placeholder='Symbol'
                                value={symbol}
                                className='test-select-username-field'
                                onChange={e => setSymbol(e.currentTarget.value)}
                            />
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='User'
                                value={newPartie}
                                className='test-select-username-field'
                                action={
                                    <Button
                                        onClick={addToWhitelist}
                                    >Add</Button>
                                }
                                onChange={e => setNewPartie(e.currentTarget.value)}
                            />
                            {whitelist.map((partie: string) => <Label key={partie}>{partie}</Label>)}
                        </Segment>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Create voucher"
                    labelPosition='right'
                    icon='rocket'
                    onClick={createVoucher}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}


export default CreateVoucherModal;