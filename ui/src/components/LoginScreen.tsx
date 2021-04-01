import React, { useCallback } from 'react'
import { Button, Form, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import Credentials, { computeCredentials } from '../Credentials';
import Ledger from '@daml/ledger';
import { DeploymentMode, deploymentMode, ledgerId, httpBaseUrl } from '../config';
import { useEffect } from 'react';
import { User } from '@daml.js/daml-vouchers';

type Props = {
  onLogin: (credentials: Credentials) => void;
}

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');

  const login = useCallback(async (credentials: Credentials) => {
    try {
      const ledger = new Ledger({ token: credentials.token, httpBaseUrl });
      let userContract = await ledger.fetchByKey(User.User, credentials.party);
      
      if (userContract === null) {
        const user = { username: credentials.party };
        userContract = await ledger.create(User.User, { email: user.username, name: user.username });
      }

      onLogin(credentials);
    } catch (error) {
      alert(`Unknown error:\n${error}`);
    }
  }, [onLogin]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = computeCredentials(username);
    await login(credentials);
  }

  const handleDablLogin = () => {
    window.location.assign(`https://login.projectdabl.com/auth/login?ledgerId=${ledgerId}`);
  }

  useEffect(() => {
    const url = new URL(window.location.toString());
    const token = url.searchParams.get('token');
    if (token === null) {
      return;
    }
    const party = url.searchParams.get('party');
    if (party === null) {
      throw Error("When 'token' is passed via URL, 'party' must be passed too.");
    }
    url.search = '';
    window.history.replaceState(window.history.state, '', url.toString());
    login({ token, party, ledgerId });
  }, [login]);

  return (
    <Grid padded textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column>
        <Header as='h1' textAlign='center' size='huge' style={{ color: '#223668' }}>
          <Header.Content>
            Voucher
            App
            <Icon circular style={{marginLeft : '10px'}} name="rocket"></Icon>
          </Header.Content>
        </Header>
        <Form size='large' className='test-select-login-screen'>
          <Segment>
            {deploymentMode !== DeploymentMode.PROD_DABL
              ? <>
                {/* FORM_BEGIN */}
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={username}
                  className='test-select-username-field'
                  onChange={e => setUsername(e.currentTarget.value)}
                />
                <Button
                  primary
                  fluid
                  className='test-select-login-button'
                  onClick={handleLogin}>
                  Log in
                </Button>
                {/* FORM_END */}
              </>
              : <Button primary fluid onClick={handleDablLogin}>
                Log in with DABL
              </Button>
            }
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginScreen;
