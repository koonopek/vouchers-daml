import { Group } from '@daml.js/daml-vouchers';
import { useLedger, useParty } from '@daml/react';
import React from 'react';
import { useAlert } from 'react-alert';
import { Button, Form, Header, Label, Modal, Segment } from 'semantic-ui-react';


function AddGroupMemberModal() {
    const [open, setOpen] = React.useState<boolean>(false)
    const party = useParty();
    const ledger = useLedger();
    const alert = useAlert();

    const [members, setMembers] = React.useState<string[]>([]);
    const [newPartie, setNewPartie] = React.useState<string>('');

    const addToMembers = () => {
        if (!members.includes(newPartie) || newPartie === '') {
            setMembers([...members, newPartie]);
            setNewPartie('');
        }
    }

    const addMember = () => {
        members.map(
            newMember => ledger.create(Group.GroupMember, { group: party, member: newMember })
                .then(() => alert.success(`Added member ${newMember}`))
                .catch(() => alert.error(`Failed to add member ${newMember}`))
        )
        setOpen(false);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Add member</Button>}>
            <Modal.Header>Add members</Modal.Header>
            <Modal.Content >
                <Modal.Description>
                    <Header>Members</Header>
                    <Form size='large' className='test-select-login-screen'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='User'
                                value={newPartie}
                                className='test-select-username-field'
                                action={
                                    <Button
                                        onClick={addToMembers}
                                    >Add</Button>
                                }
                                onChange={e => setNewPartie(e.currentTarget.value)}
                            />
                            {members.map((partie: string) => <Label key={partie}>{partie}</Label>)}
                        </Segment>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Add member"
                    labelPosition='right'
                    icon='rocket'
                    onClick={addMember}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}


export default AddGroupMemberModal;