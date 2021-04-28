import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from 'app/pages/Signin';
import VerifyEmailPassword from 'app/pages/Signin/VerifyEmailPassword';
import SignupAccount from 'app/pages/Signup';

const AppRoutes = () => (
  <Switch>
    <Route path="/account/sign-in" component={SignIn} />
    <Route path="/user/verify/email" component={VerifyEmailPassword} />
    <Route path="/user/signup" component={SignupAccount} />
  </Switch>
);

export default AppRoutes;
