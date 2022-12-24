import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { FooterComponent } from "./Components/FooterComponent";
import { Navbar } from "./Components/Navbar";
import { PostComponent } from "./Components/PostComponent";
import { SearchPostPage } from "./Components/SearchPostPage";
import { SinglePostPage } from "./Components/SinglePostPage";

function App() {
  return (
    <div className='App flex flex-col h-screen justify-between'>
      <Navbar />
      <Switch>
        <Route path={"/"} exact>
          <Redirect to={"/home"} />
        </Route>
        <Route path={"/home"}>
          <PostComponent />
        </Route>
        <Route path={"/browse"}>
          <SearchPostPage />
        </Route>
        <Route path={"/post/:postId"}>
          <SinglePostPage />
        </Route>
      </Switch>
      <FooterComponent />
    </div>
  );
}

export default App;
