import React from "react";
import { Route } from 'react-router-dom';
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from './form/login_form_container';
import SignupFormContainer from './form/signup_form_container';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <h1>Tremolonimbus</h1>
      <GreetingContainer />
    </header>

    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;