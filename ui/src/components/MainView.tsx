import { Voucher } from '@daml.js/daml-vouchers';
import { useParty, useStreamQueries } from '@daml/react';
import React from 'react';
import { Container, Divider, Grid, Header, Icon, List, Segment } from 'semantic-ui-react';
import { WalletView } from './WalletView';
import CreateVoucherModal from './CreateVoucherModal';
import { VoucherView } from './VoucherView';
import { useAutoAcceptVoucherBalanceApprovals } from './useAutoAccept';

// USERS_BEGIN
const MainView: React.FC = () => {
  useAutoAcceptVoucherBalanceApprovals();
  const party = useParty();

  const vouchers = useStreamQueries(Voucher.Voucher).contracts;

  const walletQuery = () => [{owner: party}];
  const wallets = useStreamQueries(Voucher.VoucherBalance, walletQuery, [party]).contracts;

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
                  Wallets
                  <Header.Subheader>Your voucher wallets</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <List divided relaxed >
                {
                  wallets.map(
                    wallet => wallet && <WalletView voucherBalanceId={wallet.contractId} asset={wallet.payload.asset} balance={wallet.payload.balance}/>
                    )
                }
              </List>
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
                  <Header.Subheader>Vouchers you have created</Header.Subheader>
                </Header.Content>
              </Header>
              <CreateVoucherModal />
              <Divider />
              <List divided relaxed>
                {
                  vouchers.map(
                    v => <VoucherView symbol={v!.payload.symbol} whitelist={v!.payload.whitelist}/>
                  )
                }
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
  );
}

export default MainView;
