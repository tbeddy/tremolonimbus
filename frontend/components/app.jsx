import React from "react";
import { Route } from 'react-router-dom';
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from './form/login_form_container';
import SignupFormContainer from './form/signup_form_container';
import Splash from './splash/splash';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div id="app-div">
    <header>
      <h1>Tremolonimbus</h1>
      <GreetingContainer />
    </header>

    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <AuthRoute path="/" component={Splash} />
  </div>
);

export default App;