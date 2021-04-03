import { Voucher } from '@daml.js/daml-vouchers';
import { useLedger, useParty } from '@daml/react';
import React from 'react';
import { useAlert } from 'react-alert';
import { Button, Form, Header, Modal, Segment } from 'semantic-ui-react';

export type CreateWalletModalProps = {
    symbol: string;
}

function CreateWalletModal({ symbol }: CreateWalletModalProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [startBalance, setStartBalance] = React.useState('');
    const [targetUser, setTargetUser] = React.useState('');

    const user = useParty();
    const ledger = useLedger();
    const alert = useAlert();

    const createWallet = () => {
        ledger.exerciseByKey(
            Voucher.Voucher.Issue,
            { _1: user, _2: symbol },
            { for: targetUser, startBalance }
        )
        .then(() => alert.success(`Successfully created wallet for ${targetUser}`))
        .catch(() => alert.error(`Failed to create wallet for ${targetUser}`))

        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button secondary>Create wallet</Button>}>
            <Modal.Header>Create new wallet</Modal.Header>
            <Modal.Content >
                <Modal.Description>
                    <Header>Wallet identifier</Header>
                    <Form size='large' className='test-select-login-screen'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='User'
                                value={targetUser}
                                className='test-select-user-field'
                                onChange={e => setTargetUser(e.currentTarget.value)}
                            />
                            <Form.Input
                                fluid
                                icon='money'
                                iconPosition='left'
                                placeholder='0'
                                value={startBalance}
                                className='test-select-user-field'
                                onChange={e => setStartBalance(e.currentTarget.value)}
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
                    content="Create voucher"
                    labelPosition='right'
                    icon='rocket'
                    onClick={createWallet}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}


export default CreateWalletModal;