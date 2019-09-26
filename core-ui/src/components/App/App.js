import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotificationProvider } from '../../contexts/notifications';
import NamespaceList from '../NamespaceList/NamespaceList';

export default function App() {
  return (
    <NotificationProvider>
      <Switch>
        <Route path="/" component={NamespaceList} />
      </Switch>
    </NotificationProvider>
  );
}