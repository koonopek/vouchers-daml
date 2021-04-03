// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import DamlLedger from '@daml/react';
import Credentials from '../Credentials';
import { httpBaseUrl } from '../config';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import { AlertTemplate } from './AlertView';


const AlertConfiguration = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  transition: transitions.SCALE,
}

/**
 * React component for the entry point into the application.
 */
// APP_BEGIN
const App: React.FC = () => {
  const [credentials, setCredentials] = React.useState<Credentials | undefined>();

  return credentials
    ? <DamlLedger
      token={credentials.token}
      party={credentials.party}
      httpBaseUrl={httpBaseUrl}
    >
      <AlertProvider template={AlertTemplate} {...AlertConfiguration}> <MainScreen onLogout={() => setCredentials(undefined)} /> </AlertProvider>
    </DamlLedger>
    : <LoginScreen onLogin={setCredentials} />
}
// APP_END

export default App;
