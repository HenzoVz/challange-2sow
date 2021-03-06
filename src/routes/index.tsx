import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SingUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Listing from '../pages/Listing';

const Routes: React.FC = () => (
  <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SingUp} />
      <Route path="/dashboard"  component={Dashboard} isPrivate/>
      <Route path="/registries/:id" component={Dashboard} isPrivate/>
      <Route path="/listing"  component={Listing} isPrivate/>
  </Switch>
);

export default Routes;
