import React from "react";
import { Route, Switch } from 'react-router-dom';
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from './form/login_form_container';
import SignupFormContainer from './form/signup_form_container';
import SplashContainer from './splash/splash_container';
import Modal from './modal/modal';
import StreamContainer from './stream/stream_container';
import UploadContainer from './upload/upload_container';
import ContinuousPlayerContainer from './continuous_player/continous_player_container';
import TrackPageContainer from './track_page/track_page_container';
import ProfilePageContainer from './profile_page/profile_page_container';
import { AuthRoute , ProtectedRoute } from '../util/route_util';

const App = () => (
  <div id="app-div">
    <Modal />

    <header>
      <GreetingContainer />
    </header>

    <div id="content-and-sidebars">
      <div className="sidebar content-sidebar" />
      <div className="content">
        <Switch>
          <Route path="/tracks/:trackId" component={TrackPageContainer} />
          <Route path="/users/:userId" component={ProfilePageContainer} />
          {/* <AuthRoute path="/login" component={LoginFormContainer} /> */}
          {/* <AuthRoute path="/signin" component={LoginFormContainer} /> */}
          {/* <AuthRoute path="/signup" component={SignupFormContainer} /> */}
          <AuthRoute exact path="/" component={SplashContainer} />
          <ProtectedRoute path="/stream" component={StreamContainer} />
          <ProtectedRoute exact path="/upload" component={UploadContainer} />
        </Switch>
      </div>
      <div className="sidebar content-sidebar" />
    </div>

    <footer>
      <ContinuousPlayerContainer />
    </footer>
  </div>
);

export default App;