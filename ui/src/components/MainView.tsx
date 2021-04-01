import { User, Voucher } from '@daml.js/daml-vouchers';
import { useLedger, useParty, useStreamFetchByKeys } from '@daml/react';
import React from 'react';
import { Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import CreateVoucherModal from './CreateVoucherModal';
import { VoucherView }  from './VoucherView';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKeys(User.User, () => [username], [username]);
  const myUser = myUserResult.contracts[0]?.payload;

  const ledger = useLedger();

  const vouchers = useStreamFetchByKeys(Voucher.Voucher, () => [{ _1: username, _2: "usd" }], []).contracts;

  ledger.create(Voucher.Voucher, {owner: useParty(), symbol: 'usd', whitelist: []});

  return (
    <Container fluid>
      <Grid centered >
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{ padding: '1ex 0em 0ex 0em' }}>
            </Header>
            <Segment>
              <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                  The Network
                  <Header.Subheader>My followers and users they are following</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header as='h2'>
                <Icon name='dollar sign' />
                <Header.Content>
                  Vouchers
                  <Header.Subheader>Vouchers you have created.</Header.Subheader>
                </Header.Content>
              </Header>
              <CreateVoucherModal />
              {vouchers.map(v => <VoucherView symbol={v!.payload.symbol} whitelist={v!.payload.whitelist}></VoucherView>) }
              <Divider />
            </Segment>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
  );
}

export default MainView;
