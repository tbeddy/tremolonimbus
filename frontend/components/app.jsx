import React from "react";
import { Route } from 'react-router-dom';
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from './form/login_form_container';
import SignupFormContainer from './form/signup_form_container';
import SplashContainer from './splash/splash_container';
import Modal from './modal/modal';
import Stream from './stream/stream';
import { AuthRoute , ProtectedRoute } from '../util/route_util';

const App = () => (
  <div id="app-div">
    <Modal />

    <header>
      <GreetingContainer />
    </header>

    <div id="content">
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signin" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/" component={SplashContainer} />
      <ProtectedRoute path="/stream" component={Stream} />
    </div>
  </div>
);

export default App;