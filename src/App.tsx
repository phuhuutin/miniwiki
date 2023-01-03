import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { FooterComponent } from "./Components/FooterComponent";
import { Navbar } from "./Components/Navbar";
import { PostComponent } from "./Components/PostComponent";
import { SearchPostPage } from "./Components/SearchPostPage";
import { SinglePostPage } from "./Components/SinglePostPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push("/login");
  };
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className='App flex flex-col h-screen justify-between'>
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}
      >
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <PostComponent />
          </Route>
          <Route path='/browse'>
            <SearchPostPage />
          </Route>
          <Route path='/post/:postId'>
            <SinglePostPage />
          </Route>
          <Route
            path='/login'
            render={() => <LoginWidget config={oktaConfig} />}
          ></Route>
          <Route path='/login/callback' component={LoginCallback} />
        </Switch>
        <FooterComponent />
      </Security>
    </div>
  );
};
