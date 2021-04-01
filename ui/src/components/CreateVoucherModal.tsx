import React from 'react'
import { Button, Dropdown, DropdownProps, Form, Header, Image, Label, Modal, Segment } from 'semantic-ui-react'
import { deploymentMode, DeploymentMode } from '../config'


function CreateVoucherModal() {
    const [open, setOpen] = React.useState<boolean>(false)
    const [symbol, setSymbol] = React.useState('');

    const createVoucher = () => {
        setOpen(false);
    }

    const [whitelist, setWhitelist] = React.useState<string[]>([]);
    const [newPartie, setNewPartie] = React.useState<string>('');
    
    const addToWhitelist = () => {
        if(!whitelist.includes(newPartie) || newPartie === '') {
            setWhitelist([...whitelist, newPartie]);
            setNewPartie('');
        }
    }



    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Create voucher</Button>}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content >
                <Modal.Description>
                    <Header>Default Profile Image</Header>
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